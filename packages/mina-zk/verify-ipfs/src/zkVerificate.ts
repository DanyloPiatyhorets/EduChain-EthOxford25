import {
    Field,
    SmartContract,
    state,
    State,
    method,
    Struct,
    PublicKey,
    PrivateKey,Mina,AccountUpdate,
    Signature,
    Poseidon,
  } from 'o1js';
  
  // Define certificate data structure
  export class CertificateData extends Struct({
    name: Field,
    university: Field,
    graduationDate: Field,
    degree: Field,
  }) {}
  
  export class VerifyIPFS extends SmartContract {
    @state(PublicKey) verifier = State<PublicKey>(); // Stores verifier's public key
    @state(Field) storedCID = State<Field>(); // Stores verified IPFS CID
  
    init() {
      super.init();
      this.verifier.set(PublicKey.empty()); // Initialize verifier as empty
    }
  
    @method async setVerifier(newVerifier: PublicKey): Promise<void> {
      const emptyKey = PublicKey.empty();
  
      // Ensure newVerifier is NOT empty
      // if (newVerifier.equals(emptyKey)) {
      //   throw new Error("Verifier key cannot be empty");
      // }
  
      this.verifier.set(newVerifier);
    }
  
    @method async verifyData(
      certData: CertificateData,
      providedCID: Field,
      signature: Signature
    ): Promise<void> {
      const verifierKey = this.verifier.getAndRequireEquals();
      const emptyKey = PublicKey.empty();
      verifierKey.equals(emptyKey).assertFalse()
      // Ensure verifier key is set
      // if (verifierKey.equals(emptyKey)) {
      //   throw new Error("Verifier key is not set");
      // }
  
      // Compute the expected CID from certificate fields
      const computedCID = Poseidon.hash([
        certData.name,
        certData.university,
        certData.graduationDate,
        certData.degree,
      ]);
  
      // Ensure computed CID matches provided CID
      computedCID.assertEquals(providedCID, "IPFS hash mismatch");
  
      // Verify the signature using the verifier's public key
      signature.verify(verifierKey, [providedCID]).assertTrue();
  
      // Store verified CID
      this.storedCID.set(providedCID);
    }
  }
  
  const Berkeley = Mina.Network(
    'https://api.minascan.io/node/devnet/v1/graphql'
  );
  Mina.setActiveInstance(Berkeley);
  
  const deployerKey = PrivateKey.fromBase58('EKFGTK8nCDu5N6Qp6Dz43AxUqVZrVg8NjNNdyrB16CEzsctbFoQT');
  // console.log(deployerKey.toBase58())
  const deployerAccount = deployerKey.toPublicKey() 
  console.log(deployerAccount.toBase58())
  // await VerifyIPFS.compile()
  // const zkApp = new VerifyIPFS(PublicKey.empty());
  
  console.log('Deploying VerifyIPFS...');
  
  async function deployContract() {
      try {
        // Compile the contract before deployment
        await VerifyIPFS.compile(); 
    let zkApppAdrPriv = PrivateKey.random()
        const zkApp = new VerifyIPFS(zkApppAdrPriv.toPublicKey());
    
        const deploy = await Mina.transaction({sender: deployerAccount,fee:1e8}, async () => {
          AccountUpdate.fundNewAccount(deployerAccount);
          zkApp.deploy();
        });
    
        await deploy.prove();
        const tx = await deploy.sign([deployerKey,zkApppAdrPriv]).send();
    
        console.log(`Contract deployed! Transaction hash: ${tx.hash}`);
        console.log(`Contract address: ${zkApp.address.toBase58()}`);
      } catch (error) {
        console.error('Error deploying contract:', error);
      }
    }
    
    deployContract();
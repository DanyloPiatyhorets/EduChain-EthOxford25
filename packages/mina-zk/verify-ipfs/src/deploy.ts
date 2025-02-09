// File: deploy.ts
import { VerifyIPFS } from './zkVerificate';
import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
} from 'o1js';

const Berkeley = Mina.Network(
  'https://api.minascan.io/node/devnet/v1/graphql'
);
Mina.setActiveInstance(Berkeley);

const deployerKey = PrivateKey.random();
const deployerAccount = deployerKey.toPublicKey() 
// await VerifyIPFS.compile()
// const zkApp = new VerifyIPFS(PublicKey.empty());

console.log('Deploying VerifyIPFS...');

async function deployContract() {
    try {
      // Compile the contract before deployment
      await VerifyIPFS.compile(); 
  let zkApppAdrPriv = PrivateKey.random()
      const zkApp = new VerifyIPFS(zkApppAdrPriv.toPublicKey());
  
      const deploy = await Mina.transaction(deployerAccount, async () => {
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
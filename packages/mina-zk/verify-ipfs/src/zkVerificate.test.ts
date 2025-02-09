// import { VerifyIPFS , CertificateData} from './zkVertificate';
// // File: zkVerificate.test.ts

// import {
//   Field,
//   Mina,
//   PrivateKey,
//   PublicKey,
//   AccountUpdate,
//   Signature
// } from 'o1js';

// describe('VerifyIPFS Contract', () => {
//   let deployerAccount: PublicKey,
//       deployerKey: PrivateKey,
//       verifierAccount: PublicKey,
//       verifierKey: PrivateKey,
//       zkApp: VerifyIPFS;

//   beforeEach(async () => {
//     const Local = Mina.LocalBlockchain({ proofsEnabled: true });
//     Mina.setActiveInstance(Local);
    
//     deployerKey = Local.testAccounts[0].privateKey;
//     deployerAccount = Local.testAccounts[0].publicKey;
//     verifierKey = Local.testAccounts[1].privateKey;
//     verifierAccount = Local.testAccounts[1].publicKey;
    
//     zkApp = new VerifyIPFS(PublicKey.empty());
//   });

//   it('should deploy contract and set verifier', async () => {
//     const txn = await Mina.transaction(deployerAccount, () => {
//       AccountUpdate.fundNewAccount(deployerAccount);
//       zkApp.deploy();
//     });
//     await txn.prove();
//     await txn.sign([deployerKey]).send();

//     const setVerifier = await Mina.transaction(deployerAccount, () => {
//       zkApp.setVerifier(verifierAccount);
//     });
//     await setVerifier.prove();
//     await setVerifier.sign([deployerKey]).send();

//     const storedVerifier = zkApp.verifier.get();
//     expect(storedVerifier).toEqual(verifierAccount);
//   });

//   it('should verify certificate data correctly', async () => {
//     // First deploy and set verifier
//     const txn = await Mina.transaction(deployerAccount, () => {
//       AccountUpdate.fundNewAccount(deployerAccount);
//       zkApp.deploy();
//     });
//     await txn.prove();
//     await txn.sign([deployerKey]).send();

//     await Mina.transaction(deployerAccount, () => {
//       zkApp.setVerifier(verifierAccount);
//     }).sign([deployerKey]).send();

//     // Test data
//     const certData = new CertificateData({
//       name: Field(123),
//       university: Field(456),
//       graduationDate: Field(789),
//       degree: Field(101112)
//     });

//     const providedCID = Field(123456);
//     const signature = Signature.create(verifierKey, [providedCID]);

//     // Verify data
//     const verify = await Mina.transaction(verifierAccount, () => {
//       zkApp.verifyData(certData, providedCID, signature);
//     });
//     await verify.prove();
//     await verify.sign([verifierKey]).send();

//     const storedCID = zkApp.storedCID.get();
//     expect(storedCID).toEqual(providedCID);
//   });

//   it('should reject invalid signatures', async () => {
//     // First deploy and set verifier
//     await Mina.transaction(deployerAccount, () => {
//       AccountUpdate.fundNewAccount(deployerAccount);
//       zkApp.deploy();
//     }).sign([deployerKey]).send();

//     await Mina.transaction(deployerAccount, () => {
//       zkApp.setVerifier(verifierAccount);
//     }).sign([deployerKey]).send();

//     const certData = new CertificateData({
//       name: Field(123),
//       university: Field(456),
//       graduationDate: Field(789),
//       degree: Field(101112)
//     });

//     const providedCID = Field(123456);
//     const wrongKey = PrivateKey.random();
//     const invalidSignature = Signature.create(wrongKey, [providedCID]);

//     try {
//       await Mina.transaction(verifierAccount, () => {
//         zkApp.verifyData(certData, providedCID, invalidSignature);
//       }).sign([verifierKey]).send();
//       fail('Should have thrown an error');
//     } catch (error) {
//       expect(error).toBeDefined();
//     }
//   });
// });
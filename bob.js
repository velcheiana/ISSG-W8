// bob.js
const crypto = require('crypto');
const fs = require('fs');

// Load RSA keys
const bobPrivateKey = fs.readFileSync('bobPrivateKey.pem', 'utf8');
const alicePublicKey = fs.readFileSync('alicePublicKey.pem', 'utf8');

// Encrypted message and signature received from Alice
const encryptedMessage = "0fa62521aaff65219a76a5b9dcb8970005c464b7002ec22b2c2980b67c87676ceca9a4c85c7a2447db2071e40bcaab43793963b8974ed7a31e6b1f5fb8ea28245cb06a30c546e625954aec3d41b7e699bf42b57a6977b4d099da98660529ff4663d4361a43a1aaafaca691dc2d580fad9634ffe83856950281afe1af40f2735d00f343fdf051a5ea09bb4439632fabdf3c8542dd10577393d6091cd59c1ea18dcecbf9cfa2515891433990ca0ca2fa12f7c87e9aa32b0f2ab800574fa7837f9712398f6593af44d0149642b3a942255c098b54ec6d8e6179a209f06b934da3ac05d0ffce26cef0eb843921b9122e8e53359265ad3121cebd29a7078eba0cd100"; // Replace with actual output from alice.js
const signature = "50894c18aae018c86d9f094a2332347590d0db035b95e47fa7aef2dbcfd4dc7b7b6391a36042b56982379f5132e2a77b1a1c6d0785c06082e6863979ce7ede70dca720fb4e4fe0a3cb4ba83e3b49e93bd6c9c9547f193566f829f9d37004459861a8b948efd7c195ea9dc6fd32a2be370e3d21f5517385f2f8048a5e17b94f7537b8dab9e2b89f2d88a48e9f79f9e22ef102ca801fb02d0af791da98e3f7704d8ac8d22f926cff1900f89679380085c3333aa54e7e6f376b40b9b3754897e316d2399576d208ef9a463dc2248011bee146cc638ffcd579074d46b4851f532801c6b6a82550d637f002c96d0af08248b29c898b7e0f3f69e6d4782864c02c04d5";       // Replace with actual output from alice.js

// Step 1: Decrypt the message
const decryptedMessage = crypto.privateDecrypt(
  {
    key: bobPrivateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  },
  Buffer.from(encryptedMessage, 'hex')
).toString('utf8');

console.log("Message:", decryptedMessage);

// Step 2: Verify Alice's signature
const verify = crypto.createVerify('sha256');
verify.update(decryptedMessage);
verify.end();
const isVerified = verify.verify(alicePublicKey, signature, 'hex');

console.log("Signature Verification:", isVerified);

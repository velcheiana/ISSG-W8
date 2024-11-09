// alice.js
const crypto = require('crypto');
const fs = require('fs');

// Load RSA keys
const alicePrivateKey = fs.readFileSync('alicePrivateKey.pem', 'utf8');
const bobPublicKey = fs.readFileSync('bobPublicKey.pem', 'utf8');

// Alice's message
const message = "I want some apples";

// Step 1: Sign the message
const sign = crypto.createSign('sha256');
sign.update(message);
sign.end();
const signature = sign.sign(alicePrivateKey, 'hex');

// Step 2: Encrypt the message for Bob
const encryptedMessage = crypto.publicEncrypt(
  {
    key: bobPublicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  },
  Buffer.from(message)
).toString('hex');

// Output the signature and encrypted message
console.log("Signature:", signature);
console.log("Message:", encryptedMessage);

// generateKeys.js
const crypto = require('crypto');
const fs = require('fs');

// Function to generate RSA key pair and save it to .pem files
function generateKeyPair(username) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Length of the key in bits (2048 is common for RSA)
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  // Save the public and private keys to files
  fs.writeFileSync(`${username}PublicKey.pem`, publicKey);
  fs.writeFileSync(`${username}PrivateKey.pem`, privateKey);

  console.log(`RSA key pair generated for ${username}`);
}

// Generate keys for Alice and Bob
generateKeyPair('alice');
generateKeyPair('bob');

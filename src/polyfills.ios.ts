// iOS-specific polyfills
import 'react-native-url-polyfill/auto';

import { getRandomValues as expoCryptoGetRandomValues, getRandomBytes } from "expo-crypto";
import { Buffer } from "buffer";
import nacl from 'tweetnacl';

// Buffer polyfill for iOS wallet operations
global.Buffer = Buffer;

// Crypto polyfill for tweetnacl and other crypto operations
class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}

const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();

(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(global, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

// Initialize tweetnacl PRNG for iOS
if (typeof nacl.setPRNG === 'function') {
  nacl.setPRNG((x: Uint8Array, n: number) => {
    const randomBytes = getRandomBytes(n);
    for (let i = 0; i < n; i++) {
      x[i] = randomBytes[i];
    }
  });
}

console.log("iOS polyfills loaded with crypto support and tweetnacl PRNG");
// lib/identity/createLocalDid.ts
import { generateKeyPair } from "@libp2p/crypto/keys";

export async function createLocalDid() {
  const key = await generateKeyPair("Ed25519");
  const did = `did:key:${key.publicKey.toString()}`;

  return {
    did,
    privateKey: key, // later: encrypted + stored
  };
}

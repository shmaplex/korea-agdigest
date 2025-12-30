import { createOrbitDB } from "@orbitdb/core";
import { createHelia } from "helia";

let orbitdb: any;

export async function getOrbitDB() {
  if (orbitdb) return orbitdb;

  const helia = await createHelia();
  orbitdb = await createOrbitDB({
    ipfs: helia,
    directory: "./orbit-data",
  });

  return orbitdb;
}

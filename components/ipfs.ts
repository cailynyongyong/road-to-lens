import { create } from "ipfs-http-client";

const projectId = "2OByoagrEvENN3P4ThfjGjE8bfS";
const secret = "9ddb66947fdcfca703d48b4e986f1109";

console.log("hello?");

if (!projectId || !secret) {
  throw new Error(
    "Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this"
  );
}

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(
      `${projectId}:${secret}`,
      "utf-8"
    ).toString("base64")}`,
  },
});

export const uploadIpfs = async <T>(data: T) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result;
};

export const uploadIpfsGetPath = async <T>(data: T) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result.path;
};

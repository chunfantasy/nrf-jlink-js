// npx ts-node examples/download.ts
import Jlink from "../src/index";

const jlink = new Jlink();
await jlink.download("v810f");

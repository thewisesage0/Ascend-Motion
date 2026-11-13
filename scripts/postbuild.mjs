import { copyFile, access } from "node:fs/promises";

const source = new URL("../dist/index.html", import.meta.url);
const destination = new URL("../dist/404.html", import.meta.url);

await access(source);
await copyFile(source, destination);
console.log("Created dist/404.html SPA fallback.");

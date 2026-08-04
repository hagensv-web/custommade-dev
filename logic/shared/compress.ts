import zlib from "zlib";

const method = "base64"

export function zlibCompress(text: string) {
    const raw = Buffer.from(text, "utf-8");
    const compressed = zlib.deflateSync(raw);
    return compressed.toString(method);
}

export function zlibDecompress(string: string) {
    const compressed = Buffer.from(string, method); 
    const decompressed = zlib.inflateSync(compressed);
    return decompressed.toString("utf-8");
}
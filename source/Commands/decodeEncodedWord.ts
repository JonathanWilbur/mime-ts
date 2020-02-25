import bDecode from "./bDecode";
import qDecode from "./qDecode";

export default
function decodeEncodedWord (charset: string, encoding: string, encodedText: string): string {
    const encodedBytes: Uint8Array = ((): Uint8Array => {
        switch (encoding.toUpperCase()) {
        case ("B"): {
            return bDecode(encodedText);
        }
        case ("Q"): {
            return qDecode(encodedText);
        }
        default: {
            throw new Error(`RFC 2047-encoded word encoding token '${encoding}' not understood.`);
        }
        }
    })();

    if (typeof TextDecoder !== "undefined") {
        let decoder: TextDecoder;
        try {
            decoder = new TextDecoder(charset.toLowerCase());
        } catch (e) {
            throw new Error(`Invalid character set '${charset}'.`);
        }
        return decoder.decode(encodedBytes);
    } else if (typeof Buffer !== "undefined") {
        return (Buffer.from(encodedBytes)).toString(charset.toLowerCase());
    } else {
        throw new Error("No means available for decoding text.");
    }
}

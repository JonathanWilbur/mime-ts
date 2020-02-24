import bDecode from "./bDecode";
import qDecode from "./qDecode";
import rfc2047EncodedWordRegExp from "../rfc2047EncodedWordRegExp";

export default
function decodeEncodedWord (str: string): string {
    const match: RegExpExecArray | null = rfc2047EncodedWordRegExp.exec(str);
    if (!match) {
        throw new Error("Malformed RFC 2047-encoded word.");
    }
    const charset: string = match[1];
    const encoding: string = match[2];
    const encodedText: string = match[3];

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

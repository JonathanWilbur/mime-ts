import decodeEncodedWord from "./decodeEncodedWord";
// import rfc2047EncodedWordRegExp from "../rfc2047EncodedWordRegExp";

enum ParserState {
    text = "text",
    charset = "charset",
    encoding = "encoding",
    encodedText = "encodedText",
}

/**
 * It is not sufficient to split by whitespace, because encoded words can
 * occur next to brackets, quotes, commas, periods, etc.
 *
 * @param str {string} The string that may or may not contain RFC 2047-encoded words.
 */
export default
function *decodeNonASCIIText (str: string): IterableIterator<string> {
    let state: ParserState = ParserState.text;
    let tokenStartIndex: number = 0;
    let charset: string = "";
    let encoding: string = "";
    let encodedText: string = "";

    let i: number = 0;
    while (i < str.length) {
        switch(state as string) {
        case (ParserState.text): {
            if (i > 0 && str[i] === "?" && str[i - 1] === "=") {
                state = ParserState.charset;
                tokenStartIndex = i + 1;
                yield str.slice(tokenStartIndex, (i - 1));
            }
            break;
        }
        case (ParserState.charset): {
            if (str[i] === "?") {
                state = ParserState.encoding;
                charset = str.slice(tokenStartIndex, i);
                tokenStartIndex = i + 1;
            }
            break;
        }
        case (ParserState.encoding): {
            if (str[i] === "?") {
                state = ParserState.encodedText;
                encoding = str.slice(tokenStartIndex, i);
                tokenStartIndex = i + 1;
            }
            break;
        }
        case (ParserState.encodedText): {
            if (str[i] === "=" && str[i - 1] === "?") {
                state = ParserState.text;
                encodedText = str.slice(tokenStartIndex, (i - 1));
                tokenStartIndex = i + 1;
                yield decodeEncodedWord(charset, encoding, encodedText);
            }
            break;
        }
        default: {
            throw new Error(`Not understood RFC 2047 token parsing state ${state}.`);
        }
        }
        i++;
    }
    if (tokenStartIndex !== str.length) {
        yield str.slice(tokenStartIndex);
    }
    return;
}

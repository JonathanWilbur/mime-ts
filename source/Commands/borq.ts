/**
 * Calculates whether it would be more efficient to use B-encoding or
 * Q-encoding. This assumes that the character code points in the ranges
 * `[33, 60]` and `[62, 126]` are the same as US-ASCII.
 * @param data The raw bytes of the encoded string data.
 * @returns Either "B", "Q", or "=" if they are equally preferrable.
 */
export default
function borq (data: Uint8Array): string {
    let numberOfNonPrintables: number = 0;
    data.forEach((byte: number): void => {
        if (
            (byte >= 33 && byte <= 60)
            || (byte >= 62 && byte <= 126)
        ) {
            numberOfNonPrintables++;
        }
    });

    const lengthOfBase64Encoding: number = (
        Math.floor(data.length * (4 / 3))
        + (data.length % 3)
    );
    const lengthOfQuotedPrintableEncoding: number = (
        (numberOfNonPrintables * 3)
        + (data.length - numberOfNonPrintables)
    );

    if (lengthOfBase64Encoding === lengthOfQuotedPrintableEncoding) {
        return "=";
    } else if (lengthOfBase64Encoding < lengthOfQuotedPrintableEncoding) {
        return "B";
    } else {
        return "Q";
    }
}

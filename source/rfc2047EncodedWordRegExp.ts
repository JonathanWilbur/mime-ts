const rfc2047EncodedWordRegExp: RegExp = /=\?((\p{L}|\p{N})+)\?((\p{L}|\p{N})+)\?([^ ?]+)\?=/u;

export default rfc2047EncodedWordRegExp;

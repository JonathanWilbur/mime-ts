const mime = require("../../dist/index");
const fs = require("fs");
const path = require("path");

describe("MIME Message Header decoder", () => {
    it("decodes UTF-8 in headers", () => {
        const eml = fs.readFileSync(path.join(
            __dirname, "..", "data", "messages", "utf8-in-header-01.eml",
        ), { encoding: "utf8" });
        const message = mime.InternetMessage.fromString(eml)
        expect(message.headers[0].name).toBe("From");
        expect(message.headers[0].body).toBe("Jönathan <jonathan@wilbur.space>");
    });

    it("decodes ISO-8859-1 in headers", () => {
        const eml = fs.readFileSync(path.join(
            __dirname, "..", "data", "messages", "iso-8859-1-in-header-01.eml",
        ), { encoding: "utf8" });
        const message = mime.InternetMessage.fromString(eml)
        expect(message.headers[0].name).toBe("From");
        expect(message.headers[0].body).toBe("Jönathan <jonathan@wilbur.space>");
    });

    it("omits whitespace between IETF RFC 2047 'encoded-word' tokens in headers", () => {
        const eml = fs.readFileSync(path.join(
            __dirname, "..", "data", "messages", "whitespace-between-encoded-header-words.eml",
        ), { encoding: "utf8" });
        const message = mime.InternetMessage.fromString(eml)
        expect(message.headers[0].name).toBe("From");
        expect(message.headers[0].body).toBe("Jöňathan <jonathan@wilbur.space>");
    });
});

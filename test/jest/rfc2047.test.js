const mime = require("../../dist/index");
const fs = require("fs");
const path = require("path");

describe("MIME Message decoder", () => {
    const eml = fs.readFileSync(path.join(
        __dirname, "..", "data", "messages", "utf8-in-header-01.eml",
    ), { encoding: "utf8" });

    it("decodes UTF-8 in headers", () => {
        const message = mime.InternetMessage.fromString(eml)
        expect(message.headers[0].name).toBe("From");
        expect(message.headers[0].body).toBe("Jönathan <jonathan@wilbur.space>");
    });
});

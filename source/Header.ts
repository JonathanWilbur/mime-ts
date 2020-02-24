export
class Header {
    constructor (
        readonly name: string,
        readonly body: string
    ) {
        // per Section 2.2,
        // TODO: Assert that name contains only printable ASCII except colon.
        // TODO: Assert that body contains only printable ASCII except CR or LF.
    }
}

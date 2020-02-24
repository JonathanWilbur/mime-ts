import { Mailbox, } from "./Mailbox";

export
class Group {
    constructor (
        readonly mailboxList: Mailbox[],
        readonly displayName: string
    ) {}

    public toString (): string {
        return `${this.displayName}: ${
            this.mailboxList.map((mailbox: Mailbox) =>
                mailbox.toString()).join(",")
        }`;
    }
}

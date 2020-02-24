export
class Mailbox {
    constructor (
        readonly address: string,
        readonly displayName? : string
    ) {}

    public toString (): string {
        return (this.displayName)
            ? `${this.displayName} ${this.address}`
            : this.address;
    }
}

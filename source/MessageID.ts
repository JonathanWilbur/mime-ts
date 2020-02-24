// msg-id          =       [CFWS] "<" id-left "@" id-right ">" [CFWS]
// id-left         =       dot-atom-text / no-fold-quote / obs-id-left
// id-right        =       dot-atom-text / no-fold-literal / obs-id-right
export
class MessageID {
    constructor (
        readonly idLeft: string,
        readonly idRight: string
    ) {}

    public toString (): string {
        return `<${this.idLeft}@${this.idRight}>`;
    }
}

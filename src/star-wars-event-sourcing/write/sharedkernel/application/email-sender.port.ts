export interface EmailSender {
    send(message: EmailMessage): Promise<void>;
}

export interface EmailMessage {
    to: EmailAddress;
    content: string;
}

// TODO: Validation!
export class EmailAddress {
    private constructor(readonly raw: string) {
    }

    static from(raw: string) {
        return new EmailAddress(raw);
    }
}

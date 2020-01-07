import {EmailMessage, EmailSender} from '../application/email-sender.port';

export class OnlyLogEmailSender implements EmailSender {
    send(message: EmailMessage): Promise<void> {
        // tslint:disable-next-line:no-console
        console.log('Email only logged:', message);
        return Promise.resolve();
    }

}

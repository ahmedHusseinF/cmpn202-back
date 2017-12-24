import { connect } from 'tls';
import * as console from 'console';
/**
 * Mailservice Service
 *
 */
export class Mailservice {
    async sendTestEmail() {
        let err: any = await this.send('testEmail',
            { recipientName: "Joe", senderName: "Sue" },
            { to: 'hendaoymaher@yahoo.com', subject: 'sadsad' });
        console.log(err);
    }

    async sendNewPassword(email: any, name: any, username: any, password: any) {
        let err: any = await this.send('sendPassword',
            { recipientName: name, username: username, newPassword: password },
            { to: email, subject: 'Heaven New Password' });

    }
    send(email: any, param: {}, options: {}) {
        return new Promise(resolve => {
            sails.hooks.email.send(email, param, options, (err: any) => resolve(err))
        })
    }
}

module.exports = new Mailservice();
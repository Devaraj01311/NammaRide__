const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
    try {
        const { data, error } = await resend.emails.send({
           
            from: 'NammaRide Support <onboarding@resend.dev>', 
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend Error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent successfully:', data.id);
        return data;
    } catch (err) {
        console.error('Email utility error:', err);
        throw err;
    }
}

module.exports = sendEmail;
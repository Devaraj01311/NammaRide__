const axios = require('axios');

async function sendEmail({ to, subject, html }) {
    try {
        const response = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { 
                    name: 'NammaRide Support', 
                    email: 'your-registered-email@gmail.com' 
                },
                to: [{ email: to }],
                subject: subject,
                htmlContent: html,
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY, 
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Email sent successfully via Brevo:', response.data.messageId);
        return response.data;
    } catch (err) {
        console.error('Brevo Email Error:', err.response?.data || err.message);
        throw new Error('Email utility failed');
    }
}

module.exports = sendEmail;
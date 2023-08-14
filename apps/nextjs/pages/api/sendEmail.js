import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY,
);

const sendEmail = async (req, res) => {
  const { to, subject, htmlContent } = req.body;

  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": { "Email": 'admin@vosque.education',
                    "Name": 'Vosque Education'
                  },
          "To": [
            { "Email": to }
          ],
          "Subject": subject,
          
          "HTMLPart": htmlContent,
        }
      ]
    });

  try {
    await request;
    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error.statusCode);
    res.status(500).send('Error sending email');
  }
};

export default sendEmail;

  
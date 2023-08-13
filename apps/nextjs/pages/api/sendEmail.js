import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

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
          "TextPart": text,
          "HTMLPart:": htmlContent,
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

  
import mailjet from 'node-mailjet';

const mj = mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  const request = mj
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": { "Email": 'admin@vosque.education', "Name": 'Vosque Education' },
          "Subject": subject,
          "TextPart": text,
          "To": [{ "Email": to }]
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

  
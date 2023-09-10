const sendEmail = async (req, res) => {
  const { to, subject, HTMLPart } = req.body;

  try {
    const response = await fetch('http://mailst-api.dokku.daruma.dev:1314/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mailst-api-key': process.env.MAILST_API_KEY
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        html: HTMLPart,
        user: process.env.MAILST_user,
        pass: process.env.MAILST_password
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email via RESTful API');
    }

    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error sending email');
  }
};

export default sendEmail;
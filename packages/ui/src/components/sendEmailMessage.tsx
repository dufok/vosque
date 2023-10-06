import { IncomingMessage } from 'http';

export const sendEmailMessage = async (userEmail: string, req: IncomingMessage | null = null ) => {
  console.log('Sending email to', userEmail);

  let apiUrl = '/api/sendEmail' ;

  if (typeof window === 'undefined' && req) {
    apiUrl = `${req.headers.origin}/api/sendEmail`;
  }

  try {
    const htmlContent = `
      <h1>Hola!</h1>
      <p>Добро пожаловать на базовый курс аргентинского испанского языка!</p>
      <p>Теперь Вам доступны все уроки <strong>базового курса</strong>.</p>
      <p>Для того чтобы начать обучение, Вам необходимо зайти в свой личный кабинет и выбрать нужный урок. Ниже Вы найдете ссылку на него:</p>
      <a href="www.vosque.education/userpage">www.vosque.education/userpage</a>
      <p>Удачи и пишите по любым вопросам! ;)</p>
      <p>Анастасия, создатель платформы Vosque.education</p>
      <a href="https://t.me/vosque_help">Telegram: https://t.me/vosque_help</a>
    `;

    const response = await fetch( apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userEmail,
        subject: 'Доступ к Vosque.education',
        HTMLPart: htmlContent, // Updated property name
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    // You can show a success message here if you want
  } catch (err) {
    console.error(err);
    // Handle the error as you see fit
  }
};
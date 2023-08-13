export const sendEmailMessage = async (userEmail, lessonPackName) => {
  console.log('Sending email to', userEmail, 'with pack', lessonPackName);
  
  try {
    const htmlContent = `
      <h1>Hola!</h1>
      <p>Добро пожаловать на базовый курс аргентинского испанского языка!</p>
      <p>Теперь Вам доступны все уроки <strong>${lessonPackName}</strong>.</p>
      <p>Для того чтобы начать обучение, Вам необходимо зайти в свой личный кабинет и выбрать нужный урок. Ниже Вы найдете ссылку на него:</p>
      <a href="www.vosque.education/userpage">www.vosque.education/userpage</a>
      <p>Удачи и пишите по любым вопросам! ;)</p>
      <p>Анастасия, создатель платформы Vosque.education</p>
      <a href="https://t.me/vosque_help">Telegram: https://t.me/vosque_help</a>
    `;

    const response = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: userEmail,
        subject: 'Доступ к Vosque.education',
        html: htmlContent, // Send the HTML content
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
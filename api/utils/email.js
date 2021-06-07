const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = async ({ receiver, sender, subject, body }) => {
  const msg = {
    to: receiver,
    from: sender,
    subject: subject,
    text: body,
  };
  await sendgrid.send(msg);
  console.log("Email sent");
};

module.exports = {
  sendMessage,
};

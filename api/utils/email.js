const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = async ({ receiver, sender, subject, body }) => {
  const msg = {
    to: "receiver", // Change to your recipient
    from: "sender", // Change to your verified sender
    subject: "subject",
    text: "body",
  };
  sendgrid.send(msg);
  console.log("Email sent");
};

module.exports = {
  sendMessage,
};

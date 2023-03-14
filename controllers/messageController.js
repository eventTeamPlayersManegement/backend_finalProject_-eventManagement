import * as Message from "../models/Message.js";
import sgMail from "@sendgrid/mail";

export const create = async (req, res, next) => {
  try {
    const result = await Message.create(req.body);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const { name, email, message } = req.body;

    const msg = {
      to: email,
      from: process.env.MY_EMAIl,
      subject: "Event Elite",
      text: `Hello ${name},\n\nThank you for contacting us!\n Here is a copy of your message:\n\n${message}.\n \n \n We will contact you as soon as possible.\n\nBest regards,\nThe Event Elite Team`,
    };
    sgMail
      .send(msg)
      .then(() => console.log("Email sent"))
      .catch((error) => console.error(error));

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }

  //   (async () => {
  //     try {
  //       await sgMail.send(msg);
  //     } catch (error) {
  //       console.error(error);

  //       if (error.response) {
  //         console.error(error.response.body);
  //       }
  //     }
  //   })();
};

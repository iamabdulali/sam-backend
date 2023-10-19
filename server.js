import express from "express";
import bodyParser from "body-parser";
import { createTransport } from "nodemailer";
import cors from "cors";

const app = express();
const port = 8000;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Handling form submissions
app.post("/submit", (req, res) => {
  console.log(req.body);
  const formData = req.body;
  console.log(formData);
  const recipientEmail = formData.email;
  console.log(formData, "FORM---");

  // Send the email using Nodemailer
  const transporter = createTransport({
    // Configure Nodemailer to use Gmail SMTP settings
    service: "Gmail",
    auth: {
      user: "abdulqayyum354@gmail.com", // Replace with your Gmail email
      pass: "nsmf clqw mmza pkig", // Replace with your Gmail password or an "App Password" if using 2-factor authentication
    },
  });

  // const pickupTime = new Date(formData.pickupTime);

  // if (isNaN(pickupTime.getTime())) {
  //   console.error("Invalid date:", formData.pickupTime);
  //   return res.status(400).send("Invalid date format for Pick-up Time");
  // }

  const mailOptions = {
    from: "abdulqayyum354@gmail.com",
    to: "info@allvitallimo.com", // Use the recipient's email address from the form
    subject: "Quote Confirmation Email",
    text: `
          Name: ${formData.name}
          Email: ${formData.email}
          Phone: ${formData.phone}
          Service Type: ${formData.serviceType}
         
          Number of Passengers: ${formData.passengerCount}
          Luggage Count: ${formData.luggageCount}
          Car Type: ${formData.carType}
          Pick-up Location: ${formData.pickupLocation}
          Drop-off Location: ${formData.dropOffLocation}
      `,
  };
  // console.log(mailOptions, "MAILLL BEFORE")
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending failed:", error);
      return res.status(500).send("Error sending email");
    }

    console.log("Email sent:", info.response);
    res.status(200).send("Form submitted successfully");
  });
  console.log(mailOptions, "MAILLLLL AFTERRR");
});

app.get('/', (req,res) =>{
  res.send("WORKING")
})

app.listen(port, function () {
  console.log(`Server running on http://localhost:${port}`);
});

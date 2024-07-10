import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    console.log({
      from_name: name,
      reply_to: email,
      message: message,
    });

    emailjs
      .sendForm(
        "service_l6fo3n9",
        "template_sufi43v",
        e.target,
        "COkfPBIn0dvihE9ag" // Replace with your actual EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Thank you for contact us!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log(error.text);
          setStatusMessage("Error occurred. Please try again.");
        }
      );
  };

  return (
    <div className="articlePage">
      <h1>
        <span>Contact Us</span>
      </h1>
      <p align="center">{statusMessage && <p>{statusMessage}</p>}</p>
      <div className="contactForm">
        <form onSubmit={sendEmail}>
          <label>
            Name
            <input
              type="text"
              value={name}
              name="from_name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email
            <input
              type="email"
              value={email}
              name="reply_to"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Message <br />
            <textarea
              value={message}
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

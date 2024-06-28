import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", { name, email, message });
  };

  return (
    <>
      <h1>
        <span>Contact Us</span>
      </h1>
      <div className="contactForm">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Message <br />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;

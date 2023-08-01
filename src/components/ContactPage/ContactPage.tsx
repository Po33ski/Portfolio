import React from 'react';
import './ContactPage.css';

// simpy page with mu contact data
export const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Page</h1>
      <div className="contact-info">
        <p>
          Name: <span>Jarek</span>
        </p>
        <p>
          Email: <span>jaroslaw.popardowski@wp.pl</span>
        </p>
      </div>
    </div>
  );
};


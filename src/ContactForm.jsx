import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SendIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const MailIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const UserIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MessageIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ShieldIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "70c139e9-435b-4c11-9815-945b8ea89dd1",
          from_name: "Portfolio Dispatch System",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        console.error("Dispatch Error:", result);
        alert("Transmission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network connection failed. Could not dispatch message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <div className="contact-grid">
        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-info-panel glass-panel"
        >
          <div className="terminal-header">
            <div className="header-dot red"></div>
            <div className="header-dot yellow"></div>
            <div className="header-dot green"></div>
            <span className="mono header-title">COMM_STATION_v2.0</span>
          </div>

          <div className="info-content">
            <h3 className="info-heading">Let's build something <span className="text-gradient-cyan">massive.</span></h3>
            <p className="info-text">
              I'm currently looking for new opportunities in Data Engineering and Agentic AI.
              My inbox is always open for technical discussions or potential collaborations.
            </p>

            <div className="contact-methods">
              <div className="method-item">
                <div className="method-icon cyan"><MailIcon size={20} /></div>
                <div>
                  <div className="method-label mono">EMAIL_ADDRESS</div>
                  <div className="method-value">poushalipurkayastha24@gmail.com</div>
                </div>
              </div>
              <div className="method-item">
                <div className="method-icon purple"><ShieldIcon size={20} /></div>
                <div>
                  <div className="method-label mono">SECURITY_STATUS</div>
                  <div className="method-value">Open for Global Dispatch</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Message Dispatch Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="dispatch-panel glass-panel"
        >
          <form onSubmit={handleSubmit} className="dispatch-form">
            <div className="form-grid">
              <div className="input-group">
                <label className="input-label mono"><UserIcon size={14} /> SENDER_NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="dispatch-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label mono"><MailIcon size={14} /> SENDER_EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="dispatch-input"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label mono">SUBJECT_ID</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration / Opportunity"
                required
                className="dispatch-input"
              />
            </div>

            <div className="input-group">
              <label className="input-label mono"><MessageIcon size={14} /> DATA_PAYLOAD</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
                className="dispatch-textarea"
                rows="5"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`dispatch-btn ${isSent ? 'success' : ''}`}
            >
              {isSubmitting ? (
                <span className="mono">TRANSMITTING...</span>
              ) : isSent ? (
                <span className="mono">DISPATCH_SUCCESSFUL</span>
              ) : (
                <>
                  <SendIcon size={18} />
                  <span className="mono">EXECUTE_DISPATCH</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;

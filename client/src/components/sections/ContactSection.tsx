import { useState, type FormEvent } from 'react';
import SocialLink from '../SocialLink';
import RetroPhone from '../illustrations/RetroPhone';
import { sendContactMessage } from '../../services/api';
import './ContactSection.css';

interface ContactSectionProps {
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const ContactSection = ({ email, phone, location, linkedinUrl, githubUrl }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: 'Anonymous',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: 'Anonymous', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email me directly.');
      console.error('Error sending message:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-form-wrapper">
            <h2 className="contact-title">
              Contact Me
            </h2>

            <div className="contact-info">
              {location && (
                <p className="contact-info-address">{location}</p>
              )}
              {phone && (
                <p className="contact-info-link">
                  {phone}
                </p>
              )}
              {email && (
                <p className="contact-info-link">
                  {email}
                </p>
              )}

              {/* Social Links */}
              <div className="contact-socials">
                {linkedinUrl && <SocialLink platform="linkedin" href={linkedinUrl} variant="dark" />}
                {githubUrl && <SocialLink platform="github" href={githubUrl} variant="dark" />}
              </div>
            </div>

            <div className="contact-divider">
              <h3 className="contact-form-title">
                Send a Message:
              </h3>

              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="contact-input"
                />

                <textarea
                  name="message"
                  placeholder="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="contact-textarea"
                ></textarea>

                {status === 'success' && (
                  <div className="contact-alert contact-alert-success">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {status === 'error' && (
                  <div className="contact-alert contact-alert-error">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit"
                >
                  {status === 'sending' ? 'Sending...' : 'Button'}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Phone Illustration */}
          <div className="contact-phone">
            <div className="contact-phone-inner">
              <RetroPhone />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

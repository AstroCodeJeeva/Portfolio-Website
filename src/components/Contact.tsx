import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionTitle from './SectionTitle';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent:', result.text);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Email send error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-5xl">
        <SectionTitle>Contact</SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Left Info */}
          <div className="animate-on-scroll opacity-0">
            <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Feel free to reach out to me via this form or the channels below.</p>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail size={20} /> <a href="mailto:jeevaanandan2004@gmail.com">jeevaanandan2004@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} />
                <a href="tel:+916362859637" className="text-blue-600 hover:underline">
                  +91 6362859637
                </a>
              </div>


              <div className="flex items-center space-x-3">
                <MapPin size={20} /> <span>Banglore, India</span>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md animate-on-scroll opacity-0">
            {isSubmitted ? (
              <div className="text-center text-green-600 dark:text-green-400 font-semibold py-10">Message Sent Successfully!</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full px-4 py-2 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-transparent focus:outline-none`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-transparent focus:outline-none`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className={`w-full px-4 py-2 rounded border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-transparent focus:outline-none`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 bg-blue-600 text-white rounded flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin mr-2 h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

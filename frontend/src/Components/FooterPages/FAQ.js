import React, { useState } from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                {question}
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                {answer}
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "How do I determine my size?",
            answer: "Please refer to our size guide available on each product page. If you are between sizes, we verify checking the specific fit notes or contacting us for advice."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently we only ship within India. We are working on expanding our shipping capabilities soon."
        },
        {
            question: "Can I change or cancel my order?",
            answer: "We aim to process orders quickly. If you need to make changes, please contact us within 1 hour of placing your order."
        },
        {
            question: "Where are your clothes made?",
            answer: "Our collections are ethically manufactured in India, working with partners who share our values for quality and sustainability."
        }
    ];

    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">Frequently Asked Questions</h1>
                <div className="footer-page-content">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FAQ;

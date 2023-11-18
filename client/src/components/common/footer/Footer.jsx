import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="industry-footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4 className="footer-heading">About Us</h4>
                    <p className="footer-text">Your company's mission and brief description can go here. This is an example of a long paragraph.</p>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Explore</h4>
                    <ul className="footer-list">
                        <li className="footer-list-item"><a className="footer-link" href="#">Home</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">Listings</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">Services</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">About Us</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Resources</h4>
                    <ul className="footer-list">
                        <li className="footer-list-item"><a className="footer-link" href="#">Blog</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">FAQ</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">Terms of Service</a></li>
                        <li className="footer-list-item"><a className="footer-link" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4 className="footer-heading">Contact Us</h4>
                    <p className="footer-text">
                        Address: 123 Main St,<br />
                        City, State ZIP<br />
                        Email: contact@example.com<br />
                        Phone: (123) 456-7890
                    </p>
                </div>
            </div>
            <div className="copyright">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

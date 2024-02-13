import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const footerStyle = {
        color: 'white',
        padding: '2rem',
        background: 'linear-gradient(135deg, #FFCC80, #80DEEA)',
    };

    const sectionStyle = {
        marginBottom: '0rem',
        color: 'black',
    };

    const linkStyle = {
        color: 'black',
        textDecoration: 'none',
    };

    const iconStyle = {
        marginRight: '10px',
        fontSize: '2rem',
    };

    const facebookIconStyle = {
        color: '#3b5998',
        ...iconStyle,
    };

    const twitterIconStyle = {
        color: '#55ACEE',
        ...iconStyle,
    };

    const instagramIconStyle = {
        color: '#E4405F',
        ...iconStyle,
    };

    const linkedinIconStyle = {
        color: '#0077B5',
        ...iconStyle,
    };

    return (
        <footer style={footerStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4" style={sectionStyle}>
                        <h5>Contact Us</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123-456-7890</p>
                    </div>
                    <div className="col-md-4" style={sectionStyle}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" style={linkStyle}>Home</a></li>
                            <li><a href="#" style={linkStyle}>About Us</a></li>
                            <li><a href="#" style={linkStyle}>Services</a></li>
                            <li><a href="#" style={linkStyle}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <div className="d-flex">
                            <a href="#" style={facebookIconStyle}><FaFacebook /></a>
                            <a href="#" style={twitterIconStyle}><FaTwitter /></a>
                            <a href="#" style={instagramIconStyle}><FaInstagram /></a>
                            <a href="#" style={linkedinIconStyle}><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <hr className="my-3 bg-light" />
                <div className="row">
                    <div className="col-md-6" style={{ fontSize: '1.8rem', }}>
                        <p>&copy; 2024 Flight Company. All rights reserved.</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Privacy Policy</a> | <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
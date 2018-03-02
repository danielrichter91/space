import React from 'react';

// animate scroll to top button
const scrollTop = (event) => {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
    });
    event.preventDefault();
}

const Footer = () => (
    <footer className='container footer'>
        <p className='footer__copyright'>Copyright © 2018 Space Savvy</p>
        <a className='footer__backtotop' href='#' onClick={scrollTop}>Back to top</a>
    </footer>
)

export default Footer;
import React from 'react';

// animate scroll to content button
const scrollToContent = (event) => {
    window.scroll({
        top: 595, 
        left: 0, 
        behavior: 'smooth' 
    });
    event.preventDefault();
}

const Hero = () => (
    <div className='hero__image'>
        <div className='hero__image--fade'>
            <header className='header container'>
                <a className='header__logo' href='/'>SPACE SAVVY</a>
            </header>
            <div className='hero container'>
                <h1 className='hero__title'>Discover Space Missions</h1>
                <a className='hero__scroll' href="#" onClick={scrollToContent}>Scroll to content</a>
            </div>
        </div>
    </div>
)

export default Hero;
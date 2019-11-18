import React from 'react';
import logo from '../assets/alta_logo.jpg';

// the Home page
export function Home() {

    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    <a
                        className="App-link"
                        href="http://alta.astron.nl"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ALTA
                    </a>
                    {' '}Components
                </h2>
                <img src={logo} className="App-logo"  style={{width: 300, height:200}} alt="logo" />
            </header>
        </div>
    );
}
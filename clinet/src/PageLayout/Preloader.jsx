import React from 'react';
import { assets } from '../assets/assets.js';
import './Preloader.css';

const Preloader = () => {
    return (
        <>
            <div id="preLoader">
                <div className="iconPlaceholder">
                    <img src={assets.iCommandLogoPng} alt="" />
                </div>
            </div>
        </>
    );
};

export default Preloader;

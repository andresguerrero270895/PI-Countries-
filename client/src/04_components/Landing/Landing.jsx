import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

export default function LandingPage(){
    return (
        <div className='content'>
            <h2 className = 'landingTitle'>Henry's PI</h2>
            <h1 className = 'landingSubTitle'>Countries App</h1>
            <Link to= 'home'>
            <button className='button'>Start</button>
            </Link>
        </div>
    )
}
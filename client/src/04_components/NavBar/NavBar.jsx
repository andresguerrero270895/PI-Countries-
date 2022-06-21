import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';

import './NavBar.css'

export default function NavBar(){
    return (
        <header className='navContent'>
            <Link to="/">
                <h5>  Welcome, to COUNTRIES APP </h5>
            </Link>
            <Link className='navLink' to='/home'>Home</Link>
            <Link className='navLink' to='/activity'>Add Activities</Link>
            <Link className='navLink' to='/activities'>List of Activities</Link>
            <SearchBar/>
        </header>
    )
}
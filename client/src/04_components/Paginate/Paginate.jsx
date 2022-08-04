import React from "react";
import './Paginate.css'

export default function Paginate({countriesPerPage, allcountries, paginate}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allcountries/countriesPerPage); i++) {
        pageNumbers.push(i)   
    }
    return(
        <nav className='paginadoContainer'>
            <ul className ='ul'>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li key={number}>
                        <button className="btn" onClick={()=>paginate(number)} href="/#">{number}</button> 
                    </li> 
                ))}
            </ul>
        </nav>
    )
}
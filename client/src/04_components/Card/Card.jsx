import React from "react"
import './Card.css'

export default function Card({name, flag, continent, capital, population}) {
  return (
  <div className='cardContainer'>
    <h3>{name.slice(0,16)}</h3>
    <img className= 'cardImg'src={flag} alt='Imagen no encontrada'/>
    <div className='infoConteiner'>
    <h5 className='content'>Capital: {capital}</h5>
    <h5 className='content'>Continent: {continent}</h5>
    <h5 className='content'>Population: {population}</h5>
    </div>
  </div>
  )
};
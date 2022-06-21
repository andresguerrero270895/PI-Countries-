import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, filterByContinent,filterByActivities,orderByName,orderByPopulation,getActivities } from '../../03_actions';
import Card from '../Card/Card.jsx';
import Paginate from '../Paginate/Paginate.jsx';
import './Cards.css';

export default function Cards(){
    const dispatch = useDispatch();
    const allactivities = useSelector((state) => state.activities);
    const allcountries = useSelector((state) => state.countries);

    const [, setOrden] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const currentCountry = allcountries.slice(firstCountry, lastCountry);
    
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    useEffect(() => {
      dispatch(getCountries());
      dispatch(getActivities());
    }, [dispatch]);
    
    function reloadButton(e){
      e.preventDefault()
      window.location.reload() 
    }
    
    function handleFilterContinent(e) {
      dispatch(filterByContinent(e.target.value));
      setCurrentPage(1);
    }
    
    function handleFilterActivity(e) {
      dispatch(filterByActivities(e.target.value));
      setCurrentPage(1);
    }
    
    function handleSortName(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
    
    function handleSortPopulation(e) {
      e.preventDefault();
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
    
    return (
        <div className='cardsContainer'>
           <section className='section1'>
          <div className='filterContainer'>
           
          <button id='b1' 
          className='filterAndOrder' 
          onClick={(e)=>reloadButton(e)}>RESET</button>
            <select 
            className='filterAndOrder'
            defaultValue={'A-Z'} 
            onChange={(e) => {handleSortName(e)}}>
              <option value='A-Z'disabled>Alphabetical Order</option>
              <option value='az'> A-Z </option>
              <option value='za'> Z-A </option>
            </select>
    
            <select 
            className='filterAndOrder'
            defaultValue={'max'} 
            onChange={(e) => {handleSortPopulation(e)}}>
              <option value='max' disabled>Filter By Population</option>
              <option value='max'>Higher Population</option>
              <option value='min'>Less Population</option>
            </select>
    
            <select 
            className='filterAndOrder'
            defaultValue={'all'} 
            onChange={(e) => handleFilterActivity(e)}>
              <option value="all" disabled> Activities </option>
              {allactivities.map((a) => (
                <option value={a.name}>{a.name}</option>))}
            </select>
    
            <select 
            className='filterAndOrder'
            defaultValue={'continent'} 
            onChange={(e) => handleFilterContinent(e)}>
              <option value="continent" disabled>Continents</option>
              <option value='all'>Todos</option>
              <option value='Africa'>Africa</option>
              <option value='Antarctica'>Antarctica</option>
              <option value='North America'>North_America</option>
              <option value='South America'>South_America</option>
              <option value='Asia'>Asia</option>
              <option value='Europe'>Europe</option>
              <option value='Oceania'>Oceania</option>
            </select>
          </div>
          </section>
                  
          <section className='section2'>
            <div className='cardsBox'>
            {currentCountry?.map((country) => {
              return (
                <div key={country.id}>
                  <Link to={"/home/" + country.id}>
                    <Card
                      name={country.name}
                      flag={country.flag}
                      continent={country.continent}
                      capital={country.capital}
                      population={country.population}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
          </section>
          <Paginate
            countriesPerPage={countriesPerPage}
            allcountries={allcountries.length}
            paginate={paginate}
          />  
          
        </div>
    )
}
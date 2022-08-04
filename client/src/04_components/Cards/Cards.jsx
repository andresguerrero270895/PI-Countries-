import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, filterByContinent,filterByActivities,orderByName,orderByPopulation,getActivities } from '../../actions';

import Card from '../Card/Card.jsx';
import Paginate from '../Paginate/Paginate.jsx';
import SearchBar from '../SearchBar/SearchBar';
import './Cards.css';

export default function Cards(){
    const dispatch = useDispatch();
    const allactivities = useSelector((state) => state.activities);
    const allcountries = useSelector((state) => state.countries,() => false) ;

    const [, setOrden] = useState("");

    // const [currentPage, setCurrentPage] = useState(1);
    // const [countriesPerPage] = useState(10);
    // const lastCountry = currentPage * countriesPerPage;
    // const firstCountry = lastCountry - countriesPerPage;
    // const currentCountry = allcountries.slice(firstCountry, lastCountry);
    
    // const paginate = (pageNumber) => {
    //   setCurrentPage(pageNumber);
    // };

    const [currentPage, setCurrentPage] = useState(0);

    let nextPage = () => {
        if(allcountries.length <= currentPage + 10){
            setCurrentPage(currentPage);
        } else setCurrentPage(currentPage + 10);
    };
    let prevPage = () => {
        if(currentPage < 9) {
            setCurrentPage(0)
        } else setCurrentPage(currentPage - 10);
    };
    const currentCountry = allcountries.slice(currentPage, currentPage + 10);

    const pageOne = () => {
        setCurrentPage(0)
    }

    if(currentPage > allcountries.length){
        pageOne()}

    useEffect(() => {
      dispatch(getCountries());
      dispatch(getActivities());
    }, [dispatch]);
    
    function reloadButton(e){
      e.preventDefault()
      window.location.reload() 
    }
    
    function handleFilterContinent(e) {
      e.preventDefault();
      dispatch(filterByContinent(e.target.value));
      setOrden(e.target.value);
    }
    
    function handleFilterActivity(e) {
      dispatch(filterByActivities(e.target.value));
      setOrden(e.target.value);
    }
    
    function handleSortName(e) {
      e.preventDefault();
      dispatch(orderByName(e.target.value));
      setOrden(e.target.value);
    }
    
    function handleSortPopulation(e) {
      e.preventDefault();
      dispatch(orderByPopulation(e.target.value));
      setOrden(e.target.value);
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
          <div>
          
                  
          <section className='section2'>
            <div className='cardsBox'>
            {currentCountry && currentCountry?.map((country) => {
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
          {/* <Paginate
            countriesPerPage={countriesPerPage}
            allcountries={allcountries.length}
            paginate={paginate}
          /> */}
          {currentPage !== 0 ? <button className='stylebtn1' onClick={prevPage}>&#11164; Prev-Page </button> : <div></div> }
          {currentPage !== 240 ? <button className='stylebtn2' onClick={nextPage}>Next-Page &#11166;</button> : <div></div> }
          </div>  
          
          
        </div>
    )
}
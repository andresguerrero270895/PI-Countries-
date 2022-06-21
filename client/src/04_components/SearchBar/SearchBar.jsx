import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { getCountries,searchCountries } from '../../03_actions/index.js';
import './SearchBar.css'

export default function SearchBar() {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    
    function onSubmit(e){
        e.preventDefault();
        if (name.length === 0) return alert('Type a Country');
        dispatch(searchCountries(name))
        setName('')
    }

    function onInputChange(e){
        e.preventDefault();
        setName(e.target.value)
   
    }

    return (
    <div className='formSearchBar'>
        <form  onSubmit={onSubmit}>
            <input 
            className='inputCountry' 
            type="text" 
            placeholder='Country...' 
            onChange={onInputChange} 
            value={name} />
            <button
            className='inputButton'
            type="submit"
            value="">Search</button>
        </form>
    </div>)
}
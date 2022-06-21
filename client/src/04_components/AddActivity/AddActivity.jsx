import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postActivities, getActivities } from "../../03_actions";

import NavBar from '../NavBar/NavBar';
import './AddActivity.css';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
  } else if (!input.duration) {
    errors.duration = 'Duration is required';
  } else if (!input.difficulty) {
    errors.difficulty = 'Difficulty is required';
  } else if (!input.season) {
    errors.season = "Season is required";
  } else if (input.countryId === []) {
    errors.countryId = 'Select a country';
  }
  return errors;
}

export default function AddActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.allCountries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    duration: "",
    difficulty: "",
    season: "",
    countryId: [],
  });

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(i) {
    setInput({
      ...input,
      countryId: input.countryId.filter((el) => el !== i),
    });
  }

  function handleSelect(e) {
    setInput({ ...input, countryId: [...input.countryId, e.target.value] });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name === "" ||
    input.duration === "" ||
    input.difficulty === "" ||
    input.season === "" ||
    input.countryId.length === 0) return alert('You should complete the fields');
    dispatch(postActivities(input));
    alert('Activity Succesfully created');
    setInput({
      name: "",
      duration: "",
      difficulty: "",
      season: "",
      countryId: [],
    });
    history.push('/home');
  }

  return (
    <div className="">
      <div>
        <NavBar />
      </div>

      <div className="activityCardContainer">
        <div className="activityCard">
          <div className="activityTitle">
          </div>  

          <form className="formActivity" onSubmit={handleSubmit}>
            <span className='titleCreateActivity'> Add Activities </span>
            <div className="inputActivities">
              <label className='labelActivity'></label>
              <input
                className="i"
                type="text"
                placeholder="Type the activity..."
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="e">{errors.name}</p>}
            </div>
            <div className="inputActivities">
              <label></label>
              <input
                className="i"
                type="text"
                value={input.duration}
                name="duration"
                placeholder="Type the duration in hours..."
                onChange={handleChange}
              />
              {errors.duration && <p className="e">{errors.duration}</p>}
            </div>
            <div className="inputActivities">
              <label> Difficulty </label>
              <input
                className="i"
                type="range"
                name="difficulty"
                min="1"
                max="5"
                value={input.difficulty}
                onChange={(e) => handleChange(e)}
              />
              {errors.difficulty && <p className="e"> {errors.difficulty}</p>}
            </div>
            <div className="seasonInput">
              <select
                className="i"
                name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}
              >
                <option className='op' > Season </option>
                <option className='op' value='Winter'>Winter</option>
                <option className='op' value='Autum'>Autum</option>
                <option className='op' value='Spring'>Spring</option>
                <option className='op' value='Summer'>Summer</option>
              </select>
              {errors.season && <p className="e">{errors.season}</p>}
            </div>
            {errors.countryId && <p className="e">{errors.countryId}</p>}

            <div>
              <select  className="i" onChange={(e) => handleSelect(e)}>
                <option className='op' > Countries </option>
                {countries.map((v) => (
                  <option className='op' value={v.id} key ={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="textArea">
              {input.countryId.map((country) => (
                <div className='countrieAndButton'>
                  <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(country)}/>
                  <p className='pOfCountry'>{country}</p>
                </div>
              ))}
            </div>
            <div>
              <button className='btnActivity' type="submit">Add Activity</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
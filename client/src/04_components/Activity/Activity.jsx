import React from 'react'
import '../ActivitiesList/ActivitiesList'

export default function Activity({ name, duration, season, difficulty, countryId }) {
  return (
    <div className='divActivityContainer'>
      <h2 className='h2Activity'>{name.toUpperCase()}</h2>
      <h3 className='h3Activity'>Duration: {duration} hrs</h3>
      <h3 className='h3Activity'>Season: {season}</h3>
      <h3 className='h3Activity'>Difficulty: {difficulty}</h3>
      <h3>{countryId}</h3>
    </div>
  );
}
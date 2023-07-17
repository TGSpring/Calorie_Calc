import React, { useState } from 'react';
import './App.css';
import bros from './images/bros-bro.gif';

// Function to calculate daily caloric needs
function calculateDailyCaloricNeeds(weight, height, age, gender, activityLevel) {
  let bmr;

  // Calculate BMR based on gender
  if (gender === 'M') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'F') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    console.log('Invalid gender input!');
    return;
  }

  // Adjust BMR based on activity level
  let activityFactor;
  switch (activityLevel) {
    case 'none':
      activityFactor = 1.2;
      break;
    case 'light':
      activityFactor = 1.375;
      break;
    case 'moderate':
      activityFactor = 1.55;
      break;
    case 'arnold':
      activityFactor = 1.725;
      break;
    default:
      console.log('Invalid activity level input!');
      return;
  }

  const dailyCaloricNeeds = Math.round(bmr * activityFactor);
  return dailyCaloricNeeds;
}

function App(){
  const[weight, setWeight] = useState('');
  const[height, setHeight] = useState('');
  const[age, setAge] = useState('');
  const[gender, setGender] = useState('');
  const[activityLevel, setActivityLevel] = useState('');
  const[result, setResult] = useState('');
  const[isPressed, pressed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const dailyCaloricNeeds = calculateDailyCaloricNeeds(
      parseFloat(weight),
      parseFloat(height),
      parseInt(age),
      gender.toUpperCase(),
      activityLevel.toLowerCase()
    );

    setResult(`Your daily caloric needs are: ${dailyCaloricNeeds} calories per day`);
    pressed(true);
  };

  const links = [

    {url: 'https://www.bodybuilding.com/', label: "GET TO WORK"},
    {url: 'https://www.youtube.com/watch?v=8KRzqPxR5zs', label: "Motivation"},
    {url: 'https://personal-website-6wnqyhh0i-tgspring.vercel.app/', label: "My work"}
  ];

  return (
    <div className="App">
      <div className="background-image" style={{ backgroundImage: `url(${bros})` }} />
      <div className="container">
    <h1 className='title'>Caloric Needs Calculator </h1>
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
     <label htmlFor='weight'> Weight in pounds: </label>
     <input 
     type='text'
     id='weight'
     value={weight}
     onChange={(e) => setWeight(e.target.value)}
     />
     </div>
     <div className="form-group">
     <label htmlFor='height'> Height in inches: </label>
     <input 
     type='text'
     id='height'
     value={height}
     onChange={(e) => setHeight(e.target.value)}
     />
    </div>

    <div className="form-group">
    <label htmlFor='age'> Age in years: </label>
    <input
    type='text'
    id='age'
    value={age}
    onChange={(e) => setAge(e.target.value)}
    />
    </div>
    <div className="form-group">
    <label htmlFor='gender'> Gender (M/F): </label>
    <input
    type='text'
    id='gender'
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    />
    </div>
    <div className="form-group">
    <label htmlFor='activityLevel'> Activity level (none/light/moderate/arnold): </label>
    <input
    type='text'
    id='activityLevel'
    value={activityLevel}
    onChange={(e) => setActivityLevel(e.target.value)}
    />
    </div>

    <button className= 'center'type='submit'>Calculate</button>
    </form>
    {result && <p><span className="flame-effect">{result}</span></p>}

    {isPressed && (
      <div className='links'>
        <h2>LINKS</h2>
        <ul>
          {links.map((link, index) => (
             <li key={index}>
             <a href={link.url} className="link">{link.label}</a>
           </li>
          ))}
        </ul>
        </div>
    )}
    </div>
    </div>
  );
}
export default App;
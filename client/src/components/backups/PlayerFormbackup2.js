import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../DatePicker/DatePicker';
import 'tachyons';


function PlayerForm () {

const [URL, setURL] = useState('');
const [URLdata, setURLdata] = useState('');
const [name, setName] = useState('');
const [nationality, setNationality] = useState('');
// const [birthdate, setBirthdate] = useState('');
const [age, setAge] = useState('');
const [club, setClub] = useState('');

const onNameChange = (event) => {
  setName(event.target.value)
}

const onNationalityChange = (event) => {
  setNationality(event.target.value)
}

// const onBirthdateChange = (event) => {
//   setBirthdate(event.target.value)
// }

const onAgeChange = (event) => {
  setAge(event.target.value)
}

const onClubChange = (event) => {
  setClub(event.target.value)
}



const onSubmitURL = () => {
  fetch('http://localhost:3000/addplayer', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        URL: URL,
      })
    })
      .then(response => response.json())
      .then(data => {
        setURLdata(data)
        setName(data[0])
        setAge(data[3])
        setNationality(data[5])
        setClub(data[9])
      })
      .catch(err => console.log(err))


}

const onURLChange = (event) => {
    setURL(event.target.value)
  }

    return (
      <div>
        <h5>Paste Transfermarkt URL of player's profile to load details automatically</h5>
        <div className="input-group mb-3 center">
            <input onChange={onURLChange} type="text" className = "w-60" placeholder="URL example: https://www.transfermarkt.com/lionel-messi/profil/spieler/28003" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button onClick={onSubmitURL} className="btn btn-outline-secondary" type="button">Load Player</button>
            </div>
        </div>
          <p>{URLdata}</p>
          <div className='row w-90 border border-dark center mt-5'>
            <div className="col-sm mx-4 gap-5">
              <div className="text-start my-4 vstack">
                <label>Full Name</label>
                <input value={name} onChange={onNameChange} type="text" className="rounded p-1" placeholder="Player's full name"></input>
              </div>
              <div className="text-start my-4 vstack ">
                <label>Nationality</label>
                <input value={nationality} onChange={onNationalityChange} type="text" className="rounded p-1" placeholder="Player's nationality"></input>
              </div>
              <div className='d-flex flex-row gap-4 my-4'>
                <div className="">
                  <label className="d-flex align-items-start vstack ">Date of birth </label>
                  <DatePicker className="rounded p-1"/>
                </div>
                <div className="flex-column d-flex">
                  <label className="d-flex align-items-start vstack " >Age</label>
                  <input value={age} onChange={onAgeChange} type="text" className="rounded p-1" placeholder="Player's age"></input>
                </div>
              </div>
              <div className="text-start vstack my-4">
                <label >Club</label>
                <input value={club} onChange={onClubChange} type="text" className="rounded p-1" placeholder="Player's club"></input>
              </div>
            </div> 
            <div className="col-sm mt-5 mx-4 gap-5">
              <div className="text-start my-4 vstack">
                <label>Position</label>
                <input value={name} onChange={onNameChange} type="text" className="rounded p-1" placeholder="Player's position"></input>
              </div>
              <div className="text-start my-4 vstack">
                <label>Strong foot</label>
                <input value={name} onChange={onNameChange} type="text" className="rounded p-1" placeholder="Player's preffered foot"></input>
              </div>
              <div className="text-start my-4 vstack">
                <label>Agency</label>
                <input value={name} onChange={onNameChange} type="text" className="rounded p-1" placeholder="Player's position"></input>
              </div>
            </div>
          </div>
      </div>
      
    )

  
}

export default PlayerForm
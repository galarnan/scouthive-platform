import React, {useState} from 'react';
// import Particles from 'react-particles-js';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register';
// import Logo from './components/Logo/Logo';
// import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import Rank from './components/Rank/Rank';
import './App.css';
import Players from './components/Players/Players';
 
// const particlesOptions = {
//   //customize this to your liking
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }


function App() {
  
  const [route,setRoute] = useState('signin');
  const [isSignedIn,setSignedin] = useState(false);
  const [user,setUser] = useState(
    {
      id: '',
      name: '',
      email: '',
      joined: ''
    }
  )

  const clearState = () => {
    setRoute('')
    setSignedin(false)
    setUser({})
  }


  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      clearState()
    } else if (route === 'home') {
      setSignedin(true)
    }
    setRoute(route);
  }

  return (
      <div className="App">
        {/* <Particles className='particles'
          params={particlesOptions}
        /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home'
          ? <Players userid={user.id} onRouteChange={onRouteChange}/>
          : (
             route === 'signin'
             ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
             : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
            )
        }
      </div>
    );
}

export default App;

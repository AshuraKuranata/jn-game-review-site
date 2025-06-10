import { useState} from 'react'
import './App.css'

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

function App() {

  const [page, setPage] = useState('home');
  const [user, setUser] = useState({accountName: ''});
  const [gameData, setGameData] = useState({results:[]})
  const [userGameReview, setUserGameReview] = useState([]) // for testing purposes
  const [profilePage, setProfilePage] = useState('')

  /* ---PULL FROM GAMES DATA API--- */
  /* ---CURRENTLY UNNECESSARY--- */
  // const [gamesData, setGamesData] = useState({results:[]}); // Pull of all data in the Games API array
  
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(`http://34.228.71.240:3060/api/games`) // Update to AWS Server link after initialization
  //     const JSONdata = await response.json()
  //     setGamesData(JSONdata || [])
  //     console.log(JSONdata.results) // Shows Games Data fields in array to pull from 
  //   }
  //   getData()
  // }, [])

  return (
    <>
      <Header setPage={setPage} user={user} setUser={setUser} setGameData={setGameData} setProfilePage={setProfilePage}/>
      <Main 
      page={page} // Page States
      setPage={setPage} // Change Page states in child components
      setUser={setUser} // Update User for Sign-Up & Sign-In
      user={user} // User data to refer in states
      gameData={gameData} // Specific data of a single view
      setGameData={setGameData} // Function to set state variable
      userGameReview={userGameReview}
      setUserGameReview={setUserGameReview}
      profilePage={profilePage}
      setProfilePage={setProfilePage}
          // gamesData={gamesData} // Reference to complete data set, currently unnecessary
      />
    </>
  )
}

export default App
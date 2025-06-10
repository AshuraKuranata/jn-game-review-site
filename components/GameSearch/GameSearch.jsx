import { useState } from 'react'
import './GameSearch.css'

const GameSearch = ({setPage, gameData, setGameData}, props) => {

  const [searchGameURL, setSearchGameURL] = useState('') // State Variables to guide search of games
  
  const handleClick = (game, evt) =>  { // Sends user to Create Review Page
    setGameData({
      gameName: game.name,
      gameRating: game.rating,
      gameId: game.id,
      gameImg: game.background_image,
      gameReleased: game.released,
      gameGenre: game.genres,
    })
    // console.log(gameData) // Log game data that review is made on
    if (evt.target.name === 'reviewform') {
        setPage('reviewform');
    }
    else if (evt.target.name === 'gamereviews') {
        setPage('gamereviews')
    }
    
  }

  const handleChange = (evt) => { // Catalogs input for search parameter by user
    setSearchGameURL(evt.target.value)
  }

  const handleSearchSubmit = async (event) => { // Fetches data from the Games API
    event.preventDefault();
    let response = await fetch(
        `http://34.228.71.240:3060/api/games/?search=${searchGameURL}`
    )
    let JSONdata = await response.json()
    // console.log(JSONdata) // See specific data search
    setGameData(JSONdata)
  }


  return (
    <div>
      <h1>Game Search</h1>
      <form className="search-form"onSubmit={handleSearchSubmit}> {/* Search bar to submit new game */}
          <input id="gameSearchText" type='text' placeholder="Game title... 'Witcher 3' 'GTA V'" onChange={handleChange}/><br/><br/>
          <button id="btnContainer" type='submit'>Search Games</button>
      </form>
      <div className='searchBox'>
      {!gameData 
      ? <></>
      : gameData.results.map((game) => (
          <div className='game-container' key={game.id}> 
            <img src={game.background_image} style={{ maxWidth: '600px', maxHeight: '500px'}}/>
            <h2> {game.name}</h2>
            <h3> Rating: {game.rating}</h3>
            <h3> Metacritic: {game.metacritic}</h3>
            <div id="btnContainer">
              <button name='reviewform' onClick={(evt) => handleClick(game, evt)}>Write Review</button>
              <button name='gamereviews' onClick={(evt) => handleClick(game, evt)}>See Written Reviews</button>
            </div>
          </div>
        ))
      }
      </div>
      <a id="apiRef" href="https://rawg.io/" target="_blank"> Powered by RAWG.io</a>
    </div>
  )   
}

export default GameSearch
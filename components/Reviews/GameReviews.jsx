import { useState, useEffect } from 'react'
import './GameReviews.css'

const GameReviews = (props) => {

    const [gameReviews, setGameReviews] = useState([]);

    useEffect(() => {
        const getGameReviews = async () => {
            console.log(props.gameData)
            const response = await fetch(`http://3.80.194.147:3000/home/${props.gameData.gameAPIId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
            }) // Update to AWS Server link after initialization
            const JSONdata = await response.json()
            setGameReviews(JSONdata || [])
          }
          getGameReviews();
    }, [])

    return (
        <>
        <h1>Game Reviews</h1>
        <div className='game-container' key={props.gameData.gameId}>
            <img src={props.gameData.gameImg} style={{ maxWidth: 500}}/>
            <h2>{props.gameData.gameName}</h2>
            <h3>Overall Rating: <span style={{fontWeight: 'normal'}}>{props.gameData.gameRating}</span></h3>
            <h3>Date Released: <span style={{fontWeight: 'normal'}}>{props.gameData.gameReleased}</span></h3>
            <h3>Genre: {props.gameData.gameGenre.map((genre) => (
                <span style={{fontWeight: 'normal'}}>{genre.name + ' '}</span>
            ))}
            </h3>

        </div>

        <div className="game-review-container">
            {gameReviews.filter(game => game.gameAPIId === props.gameData.gameId).length > 0 ? (
                gameReviews.filter(game => game.gameAPIId === props.gameData.gameId).map((review, index) => (
                    <div className="game-review-card" key={index}>
                        <h2>Review Title: {review.title}</h2>
                        <h3>User Reviewer: {review.user}</h3>
                        <p>Review Body: {review.body}</p>
                        <p>Review Stars: {review.stars}</p>
                    </div>
                    ))
                )
                
                : (<h1>No Reviews Written</h1>)
            }
        </div>
        <div><a href="https://rawg.io/" target="_blank"> Powered by RAWG.io</a></div>
        </>
    )
}
export default GameReviews

// Reviews by Titles - search for Game ID Reviews
// based on the ID of the games itself
// make a fetch request into the mongoDB 

// What do I need to reference:
// Reviews Database - fetch the data from the reviews database
// Do a find() through the objects - data passed from clicking on all reviews related to the gameId:
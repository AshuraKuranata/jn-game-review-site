import { useState } from 'react'
import './ReviewForm.css'

const ReviewForm = ({setGameData, gameData, setPage, setUserGameReview, user}) => {

    const [newReview, setReviewForm] = useState({ // new review form state variable
        gameId: '',
        title: '', 
        body: '', 
        stars: null})

    const handleChange = (evt) => { // handles the form submission values that the user is inputting
        evt.preventDefault()
        setReviewForm({ ...newReview, [evt.target.name]: evt.target.value})
        // console.log(newReview)
    }

    const handleSubmit = async (evt) => { // New Review submission logic
        evt.preventDefault();
        
        const newReviewSubmission = { // handles the addition of the gameId into the new review submission 
            ...newReview,
            gameId: gameData.gameId
        }
        
        setUserGameReview(prev => [...prev, newReviewSubmission]) // Logic to set the game review into the state variable 
        
        // Set logic to app.post new review submissions into Reviews Database
        try {
            
            // Send create new review req to db, and catpure response. 
            const Response = await fetch("http://3.80.194.147:3000/reviews/new", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: user.accountName, 
                    gameAPIId: newReviewSubmission.gameId,
                    stars: newReviewSubmission.stars,
                    title: newReviewSubmission.title,
                    body: newReviewSubmission.body,
                    likes: 0,
                    dislikes: 0
                })
              })
              
            // If login was successful...
            if (Response) {

                setReviewForm({gameId: '', title: '', body: '', stars: null}) // resets submission form
                setGameData({results:[]})
                setPage('home') // Navigates back to main page
                // console.log('Check Game Id: ', newReviewSubmission)
            }

        } catch (err) {

            console.log(err);
        }
    }

    return (
        <div>
            <div className='game-container' key={gameData.gameId}>
                <img src={gameData.gameImg} style={{ maxWidth: 500}}/>
                <h2>{gameData.gameName}</h2>
                <h3>Overall Rating: <span style={{fontWeight: 'normal'}}>{gameData.gameRating}</span></h3>
                <h3>Date Released: <span style={{fontWeight: 'normal'}}>{gameData.gameReleased}</span></h3>
                <h3>Genre: {gameData.gameGenre.map((genre) => (
                    <span style={{fontWeight: 'normal'}}>{genre.name + ' '}</span>
                ))}
                </h3>
            </div>
            <form className="reviewForm">
                <label name="title" style={{fontSize: '2em'}}>Review Title: </label><br/>
                    <input
                    id='revTitle'
                    type="text"
                    name='title'
                    placeholder={`${user.userName}'s review`}
                    value={newReview.title}
                    onChange={handleChange}
                    />
                <br/><br/>
                <label name="body" style={{fontSize: '2em'}}>Your Review:<br/>
                    <textarea 
                    rows="10"
                    cols="70"
                    type="text"
                    name='body'
                    value={newReview.body}
                    placeholder="Type Review Here"
                    style={{padding: '10px', fontSize: '14px'}}
                    onChange={handleChange}>
                    </textarea>
                </label><br/><br/>
                <label name="stars">
                    <div id="starsBtn">
                        <button name='stars' value={1} onClick={handleChange}>1 Star</button>
                        <button name='stars' value={2} onClick={handleChange}>2 Stars</button>
                        <button name='stars' value={3} onClick={handleChange}>3 Stars</button>
                        <button name='stars' value={4} onClick={handleChange}>4 Stars</button> 
                        <button name='stars' value={5} onClick={handleChange}>5 Stars</button> 
                    </div>
                </label>
                <br/><br/>
                <button onClick={handleSubmit}>Submit New Review</button>
            </form>
            <a id='apiRef' href="https://rawg.io/" target="_blank"> Powered by RAWG.io</a>
        </div>
        
        );
};

export default ReviewForm;
import { useState, useEffect } from 'react'
import './Reviews.css'

const Reviews = (props) => {

    const [reviews, setReviews] = useState([]);

    const handleClick = async (evt) => {

        if (props.user.accountName !== '') {
            if (evt.target.name === 'likebutton') {
                evt.target.innerText = 'Likes: ' + (parseInt(evt.target.value) + 1)
                await fetch(`http://3.80.194.147:3000/reviews/${evt.target.id}/edit`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        likes: parseInt(evt.target.value) + 1,
                    })
                })
            } else {
                evt.target.innerText = 'Dislikes: ' + (parseInt(evt.target.value) + 1)
                    await fetch(`http://3.80.194.147:3000/reviews/${evt.target.id}/edit`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        dislikes: parseInt(evt.target.value) + 1,
                    })
                })
            }
        }
    }

    useEffect(() => {

        const getReviews = async () => {
            // Fetch all reviews from DB
            const response = await fetch(`http://3.80.194.147:3000/reviews/`)
            // const response = await fetch(`http://localhost:3000/reviews/`)
            // If successful...
            if (response) {
                // Parse JSON data into review array
                const JSONdata = await response.json()
                // GO through each review...
                for (const reviewObj of JSONdata) {
                    // Fetch infro from API based on gameid
                    const gameResponse = await fetch(`http://34.228.71.240:3060/api/games/${reviewObj.gameAPIId}`);
                    // JSON info
                    const JSONgameData = await gameResponse.json();
                    // Add game name to review object
                    reviewObj.gameName = JSONgameData.name;
                    // Add game image to object
                    reviewObj.gameImg = JSONgameData.background_image;
                }
                setReviews(JSONdata || [])
            }
        }
        getReviews();

    }, [])

    return (

        <div className='reviews-container'>
            {!reviews 
                ? <p>Pick a game to review!</p> 
                : reviews.map((review) => {

                    return (
                        <div key = {review._id} className='review-container'>
                            <img src={review.gameImg} style={{maxWidth: '100%', maxHeight: "20%"}} />
                            <h3>{review.gameName}</h3>
                            <h4>{review.title}</h4>
                            <p>by {review.user}</p>
                            <p>{review.body}</p>
                            Stars: {review.stars}
                                    {review.stars === 1 ? <p><img src='/star.svg' className='star'/> </p>: 
                                    review.stars === 2 ? <p><img src='/star.svg' className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 3 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 4 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg' className='star'/> </p> : 
                                    review.stars === 5 ? <p><img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/> <img src='/star.svg'  className='star'/><img src='/star.svg'  className='star'/><img src='/star.svg'  className='star'/> </p>: <></> }

                            <button className='likeBtn' id={review._id} name='likebutton' value={review.likes} onClick={handleClick}>Likes: {review.likes}</button>
                            <button className='dislikeBtn' id={review._id} name='dislikebutton' value={review.dislikes} onClick={handleClick}>Disikes: {review.dislikes}</button>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Reviews;
import Reviews from "../Reviews/Reviews";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import GameSearch from "../GameSearch/GameSearch";
import Profile from "../Profile/Profile.jsx"
import GameReviews from "../Reviews/GameReviews.jsx"

import './Main.css'
const Main = (props) => {
    
    
    return (
    <>
        <main className="main">
        {props.page === 'home' ? <Reviews user={props.user} /> : <></>}
        {props.page === 'login' ? <LoginForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'signup' ? <SignupForm setUser={props.setUser} setPage={props.setPage}/> : <></>}
        {props.page === 'reviewform' ? <ReviewForm setPage={props.setPage} setGameData={props.setGameData} gameData={props.gameData} userGameReview={props.userGameReview} setUserGameReview={props.setUserGameReview} user={props.user}/> : <></>}
        {props.page === 'gamesearch' ? <GameSearch setPage={props.setPage} setGameData={props.setGameData} gameData={props.gameData} /> : <></>}
        {props.page === 'profile' ? <Profile user={props.user} setUser={props.setUser} profilePage={props.profilePage} setProfilePage={props.setProfilePage}/> : <></>}
        {props.page === 'gamereviews' ? <GameReviews setPage={props.setPage} setGameData={props.setGameData} gameData={props.gameData} userGameReview={props.userGameReview} setUserGameReview={props.setUserGameReview} user={props.user}/> :<></>}


        </main>
     </>
    );
};

export default Main;
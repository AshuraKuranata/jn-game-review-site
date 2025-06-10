import './Header.css'

const Header = (props) => {


    const handleClick = (event) =>{
        props.setProfilePage('')
        props.setPage(event.target.name);
    }

    const handleLogout = async () => {
        await fetch('http://3.80.194.147:3000/auth/sign-out')
        props.setUser({accountName: ''})
        props.setPage('home')
    }

    const handleGameSearch = () => {
        props.setGameData({results:[]})
        props.setPage('gamesearch')
    }

    return (
        <header>
            <h1>Video Game Review Site</h1>
            {props.user.accountName === ''
            ? 
            <div className='headerBox'>
            <button className='hdrBtn' name="login" onClick={handleClick}>Log In</button>
            <button className='hdrBtn' name="signup" onClick={handleClick}>Sign up</button>
            </div>
            : 
            <div className='headerBox'>
            <button className='hdrBtn' name="home" onClick={handleClick}>Home</button>
            <button className='hdrBtn' name="profile" onClick={handleClick}>Profile</button>
            <button className='hdrBtn' onClick={handleGameSearch}>Game Search</button>
            <button className='hdrBtn' name="signout" onClick={handleLogout}>Log-Out</button>
            </div>
            }
            
        
        </header>

    );
};

export default Header;
import './SignupForm.css'

const SignupForm = (props) => {

    const handleSubmit = async (event) => {
        try {

            event.preventDefault();
            
            const Response = await fetch("http://3.80.194.147:3000/auth/sign-up", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountName: event.target.elements.accountName.value,
                    userName: event.target.elements.userName.value,
                    password: event.target.elements.password.value,
                    confirmPassword: event.target.elements.confirmPassword.value
                })
              })

            if (Response) {

                event.target.elements.accountName.value = '';
                event.target.elements.userName.value = '';
                event.target.elements.password.value = '';
                event.target.elements.confirmPassword.value = '';

                const signedInUser = await Response.json();
               
                props.setUser(signedInUser);
                props.setPage('home');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className="signup-form"action="http://3.80.194.147:3000/auth/sign-up" method="POST" onSubmit={handleSubmit}>

            <h2>Signup for an Account!</h2>
            <label htmlFor="accountName">Account Name:</label>
            <input type="text" name="accountName" id="accountName" required/>

            <label htmlFor="userName">User Name:</label>
            <input type="text" name="userName" id="userName" required />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" id="confirmPassword" required />
            <button type="submit" id="signUpButton">Sign up</button>
        </form>
    );
};

export default SignupForm;
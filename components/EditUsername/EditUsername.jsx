import './EditUsername.css'

const EditUsername = (props) => {

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const Response = await fetch("http://3.80.194.147:3000/auth/edit-username", {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accountName: props.user.accountName,
                    userName: event.target.elements.userName.value,
                })
              })

            if (Response) {
                event.target.elements.userName.value = '';
                const signedInUser = await Response.json();
                props.setUser(signedInUser);
                props.setProfileForm('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <form className="usernameForm"action="http://3.80.194.147:3000/auth/edit-username" method="POST" onSubmit={handleSubmit}>
            <p>Edit Username</p>
            <label htmlFor="userName">User Name:</label>
            <input type="text" name="userName" id="userName" required />
            <button type="submit" id="signUpButton">Edit</button>
        </form>
        </>
    );
};

export default EditUsername;
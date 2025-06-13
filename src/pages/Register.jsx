import { useState } from 'react';
import auth from '../firebase.init.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        setErrorMessage('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result =>{
                console.log(result.user);
            })
            .catch(error =>{
                console.log('Error',error.message);
                setErrorMessage(error.message)
            })
    }
    return (
        <div className='max-w-lg mx-auto'>
            <h1 className="text-5xl my-8 text-center">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="card shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input w-full" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input w-full" placeholder="Password" />
                            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-700'>{errorMessage}</p>
            }
        </div>
    );
};

export default Register;
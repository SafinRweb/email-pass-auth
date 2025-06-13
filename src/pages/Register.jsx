import { useState } from 'react';
import auth from '../firebase.init.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPass, setShowPass] = useState(false);
    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        setErrorMessage('');
        setSuccess(false);
        if (password.length < 6) {
            setErrorMessage('Password should be at least 6 characters long.');
            return;
        } else if (!upperCaseRegex.test(password)) {
            setErrorMessage('Password must include at least one uppercase letter.');
            return;
        } else if (!lowerCaseRegex.test(password)) {
            setErrorMessage('Password must include at least one lowercase letter.');
            return;
        } else if (!digitRegex.test(password)) {
            setErrorMessage('Password must include at least one number.');
            return;
        } else if (!specialCharRegex.test(password)) {
            setErrorMessage('Password must include at least one special character.');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);
            })
            .catch(error => {
                console.log('Error', error.message);
                setErrorMessage(error.message)
                setSuccess(false);
            })
    }
    return (
        <div className='max-w-lg mx-auto'>
            <h1 className="text-5xl my-8 text-center">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="card shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset relative">
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input w-full" placeholder="Email" />
                            <label className="label">Password</label>
                            <input 
                            type={showPass ? 'text':'password'} 
                            name='password' 
                            className="input w-full" 
                            placeholder="Password" 
                            required/>
                            <button className='btn btn-xs absolute right-2 top-26'>
                                
                                {
                                   showPass ? <FaEyeSlash/>:<FaEye />
                                }
                                </button> 
                            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                            <button 
                            onClick={()=> setShowPass(!showPass)}
                            className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-700'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-500'>Successfully Created an Account</p>
            }
        </div>
    );
};

export default Register;
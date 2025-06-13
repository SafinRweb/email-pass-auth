import { useState } from 'react';
import auth from '../firebase.init.js';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setErrorMessage('');
        setSuccess(false);

        // Password validations
        const validations = [
            password.length >= 6 || "Password should be at least 6 characters long.",
            /[A-Z]/.test(password) || "Password must include at least one uppercase letter.",
            /[a-z]/.test(password) || "Password must include at least one lowercase letter.",
            /[0-9]/.test(password) || "Password must include at least one number.",
            /[!@#$%^&*(),.?":{}|<>]/.test(password) || "Password must include at least one special character."
        ];

        for (const v of validations) {
            if (v !== true) {
                setErrorMessage(v);
                return;
            }
        }

        // Create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);

                // Send verification email
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Verification email sent');
                    });
            })
            .catch(error => {
                console.log('Error:', error.message);
                setErrorMessage(error.message);
                setSuccess(false);
            });
    };

    return (
        <div className='max-w-lg mx-auto'>
            <h1 className="text-5xl my-8 text-center">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="card shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset relative">
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input w-full" placeholder="Name" required />

                            <label className="label">Photo</label>
                            <input type="text" name='photo' className="input w-full" placeholder="Photo URL" />

                            <label className="label">Email</label>
                            <input type="email" name='email' className="input w-full" placeholder="Email" required />

                            <label className="label">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    name='password'
                                    className="input w-full pr-10"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-3 text-lg"
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button className="btn btn-neutral mt-6">Register</button>
                        </fieldset>
                    </div>
                </div>
            </form>

            <p className='my-5 text-2xl text-center'>
                Already have an account? <Link to="/login" className='text-blue-400'>Login</Link>
            </p>

            {errorMessage && <p className='text-red-700 text-center'>{errorMessage}</p>}
            {success && <p className='text-green-500 text-center'>Successfully Created an Account</p>}
        </div>
    );
};

export default Register;

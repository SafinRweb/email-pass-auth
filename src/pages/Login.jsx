import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase.init';
import { Link } from 'react-router';
import { useRef, useState } from 'react';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const emailRef = useRef();

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess(false);
        setLoginError('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess(true)

                if (!result.user.emailVerified) {
                    setLoginError('Please verify your email address.')
                } else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.log(error.user)
                setSuccess(false)
                setLoginError(error.user)
            });
    }
    const handleForgetPass = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide a valid email address.')
        }else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('Password Reset email sent, please check your email.')
            })
        }
    }

    return (
        <div>
            <h1 className="text-3xl text-center my-8">Login</h1>
            <form onSubmit={handleLogin}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 max-w-md mx-auto">
                    <label className="label">Email</label>
                    <input ref={emailRef} type="email" name='email' className="input w-full" placeholder="Email" required />

                    <label className="label">Password</label>
                    <input type="password" name='password' className="input w-full" placeholder="Password" required />
                    <div><a onClick={handleForgetPass} className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
            <div>
                <p className='my-5 text-2xl text-center'>New to this website? Please <Link to="/register" className='text-blue-400'>Sign Up</Link></p>
            </div>
            {
                success && <p className='text-2xl text-green-500'>User Login Successfull.</p>
            }
            {
                loginError && <p className='text-2xl text-red-500'>{loginError}</p>
            }
        </div>
    );
};

export default Login;
import React, { useState } from "react";
import axios from "axios";

import "./style.css";
import NavBar from "../../components/NavBar";

function Form ({ option }) {
    const [submited, setSubmited] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordR, setPasswordR] = useState('');
    
    const submit = async e => {
        console.log("submiting auth to server");
        e.preventDefault();
        // TODO: Form validation

        const user = {
            username: email,
            password: password
        }

        console.log(user);
        // TODO: Check option for sign in or sign out;
        // Create a POST request 
        const {data} = await axios.post('http://127.0.0.1:8000/token/',
            user,
            {headers: {
                'Content-Type': 'application/json'
            }}, {withCredentials: true});

    }
	return (
		<form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
			<div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
				<input id='email' name='email' type='email'
                        placeholder='E-mail' required
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
				<input id='password' name='password' type='password'
                        placeholder='Password'
                        required={option === 1 || option === 2 ? true : false}
                        disabled={option === 3 ? true : false}
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
				<input id='repeat-password' name='repeat-password' type='password' 
                        placeholder='Repeat password'
                        required={option === 2 ? true : false}
                        disabled={option === 1 || option === 3 ? true : false}
                        value={passwordR}
                        onChange={e => setPasswordR(e.target.value)}/>
			</div>
			<button className='btn-submit-form' type='submit' onClick={submit}>
				{ option === 1 ? 'Sign in' : (option === 2 ? 'Sign up' : 'Reset password') }
			</button>
		</form>
	)
}

function Login () {
	const [option, setOption] = React.useState(1)
	
	return (
    <>
        <NavBar/>
		<div className='login'>
			<header>
				<div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
					<span>Sign in to your account</span>
					<span>Create an account</span>
				</div>
			</header>
			<ul className='options'>
				<li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Sign in</li>
				<li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Sign up</li>
			</ul>
			<Form option={option} />
		</div>
    </>
	)
}
 
export default Login;
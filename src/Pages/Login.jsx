import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"



const Login = () => {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    
    const handleLogin = () =>{
        axios.post('https://backend-book-499o.onrender.com/user/Login', {username, password})
        .then(Response =>{
        const{username} = Response.data;
        console.log('username:', username);
        localStorage.setItem('username', Response.data.username);
        localStorage.setItem('token', Response.data.token);
        enqueueSnackbar('Login successful', {variant: 'success'});
        navigate("/home")
  
     } )}
  return (
<div className='p-4'>
    <h1 className='mx-4 my-4'>Login</h1>
    <div className='p-4'>
        <div className='my-4'>
            <label className='mx-3 mr-4'>Username</label>
            <input type="text" value={username}
            onChange={e => setUsername(e.target.value)} 
            className='px-4 py-2'/>
        </div>
        <div className='my-4'>
            <label className='mx-3 mr-4'>Password</label>
            <input type="password" value={password}
            onChange={e => setPassword(e.target.value)} 
            className='px-4 py-2'/>
        </div>
        <button className='btn btn-primary mx-4 my-2 p-2' style={{width:300}} 
    onClick={handleLogin}>Login</button>
    <div>
        <p className='mx-4'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
    </div>
    </div>
</div>
  )
}


export default Login
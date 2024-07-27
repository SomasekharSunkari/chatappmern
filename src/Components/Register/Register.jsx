import React, { useContext, useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { UserContext } from './UserContext';
const Register = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [LogOrReg,setLogOrReg] = useState("register");
    const {username:LogedUser,id:LogedId,setUsername:setLogedUser,setId:setLogdId} = useContext(UserContext)
        async function handleSubmit(ev){
            ev.preventDefault();
            const url = LogOrReg === 'register'?"register":"login";
        const {data} = await axios.post(url,({username:username,password:password}));
        setLogedUser(username)
        setLogdId(data.id)
        console.log(LogedId)
        console.log(LogedUser)
        // console.log(userDoc)

    }


  return (
    <div className="bg-blue-50 h-screen flex items-center">
    <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
      <input value={username}
             onChange={ev => setUsername(ev.target.value)}
             type="text" placeholder="username"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <input value={password}
             onChange={ev => setPassword(ev.target.value)}
             type="password"
             placeholder="password"
             className="block w-full rounded-sm p-2 mb-2 border" />
      <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
        {LogOrReg === 'register' ? 'Register' : 'Login'}
      </button>
      <div className="text-center mt-2">
        {LogOrReg === 'register' && (
          <div>
            Already a member?
            <button className="ml-1" onClick={() => setLogOrReg('login')}>
              Login here
            </button>
          </div>
        )}
        {LogOrReg === 'login' && (
          <div>
            Dont have an account?
            <button className="ml-1" onClick={() => setLogOrReg('register')}>
              Register
            </button>
          </div>
        )}
      </div>
    </form>
  </div>
  )
}

export default Register

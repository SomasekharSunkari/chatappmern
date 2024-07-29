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
            const url = LogOrReg === 'register'?"/register":"/login";
        const {data} = await axios.post(url,({username:username,password:password}));
        console.log(data)
      

        localStorage.setItem('id',data.id)
        setLogedUser(username)
        // localStorage.setItem("id",data.id)
        setLogdId(data.id)
      

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

// import React, { useContext, useState } from 'react';
// import './Register.css';
// import axios from 'axios';
// import { UserContext } from './UserContext';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [LogOrReg, setLogOrReg] = useState('register');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const {
//     username: LogedUser,
//     id: LogedId,
//     setUsername: setLogedUser,
//     setId: setLogdId,
//   } = useContext(UserContext);

//   async function handleSubmit(ev) {
//     ev.preventDefault();
//     setLoading(true);
//     setError('');
//     const url = LogOrReg === 'register' ? '/register' : '/login';

//     try {
//       const { data } = await axios.post(url, {
//         username: username,
//         password: password,
//       });
//       setLogedUser(username);
//       setLogdId(data.id);
//       console.log(LogedId);
//       console.log(LogedUser);
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   return (
//     <div className="bg-blue-50 h-screen flex items-center">
//       <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
//         <input
//           value={username}
//           onChange={(ev) => setUsername(ev.target.value)}
//           type="text"
//           placeholder="username"
//           className="block w-full rounded-sm p-2 mb-2 border"
//           aria-label="Username"
//           required
//         />
//         <input
//           value={password}
//           onChange={(ev) => setPassword(ev.target.value)}
//           type="password"
//           placeholder="password"
//           className="block w-full rounded-sm p-2 mb-2 border"
//           aria-label="Password"
//           required
//         />
//         <button
//           className="bg-blue-500 text-white block w-full rounded-sm p-2"
//           disabled={loading || !validateForm()}
//         >
//           {loading ? 'Processing...' : LogOrReg === 'register' ? 'Register' : 'Login'}
//         </button>
//         {error && <div className="text-red-500 text-center mt-2">{error}</div>}
//         <div className="text-center mt-2">
//           {LogOrReg === 'register' && (
//             <div>
//               Already a member?
//               <button
//                 className="ml-1 text-blue-500 underline"
//                 onClick={() => setLogOrReg('login')}
//               >
//                 Login here
//               </button>
//             </div>
//           )}
//           {LogOrReg === 'login' && (
//             <div>
//               Don't have an account?
//               <button
//                 className="ml-1 text-blue-500 underline"
//                 onClick={() => setLogOrReg('register')}
//               >
//                 Register
//               </button>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;


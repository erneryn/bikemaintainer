import React, { useState, useEffect } from "react";
import axios from "axios";
import { urlServer } from "../config";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import MainLayout from '../layout/mainlayout';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cookies, setCookie] = useCookies(["token"]);
  const [open,setOpen] = useState(false)
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const _login = await axios.post(urlServer + "/user/login", {
        email,
        password,
      });

      let date = new Date();
      date.setDate(date.getDate() + 1);
      setCookie("token", _login.data.token, {
        expires: date,
      });

      history.push("/dashboard");
    } catch (error) {
      setOpen(true)
    }
  };

  useEffect(()=>{
    if(cookies.token){
      history.push('/dashboard')
    }
  })

  const Alert = (props)=> {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <MainLayout>
    <div className="xl:w-5/12 md:w-3/4">
      <h1 className="text-4xl mb-4">Login</h1>
      <div className="w-3/6 mb-7 border-gray-600 border-b-2"></div>
      <div className="bg-gray-500 my-2 p-6  rounded-2xl flex flex-col justify-center items-center relative">
        <div className="w-full">
          <p className="mb-2">Email :</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg h-12 w-full px-10 text-lg text-left bg-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
          ></input>
        </div>
        <div className="w-full my-2 mb-10">
          <p className="mb-2">Password :</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="rounded-lg h-12 w-full sm:px-10 text-lg text-left bg-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
          ></input>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 rounded-2xl text-white md:text-3xl md:px-20 px-10 py-2 leading-10 absolute right-0 bottom-0 -mb-7 mr-8"
        >
          LOGIN
        </button>
      </div>
    </div>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical : 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          Password Or Email Wrong !
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default Login;

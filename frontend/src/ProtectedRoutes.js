import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import Axios from 'axios'
import { urlServer } from './config'

const ProtectedRoutes = ({auth,children, ...rest })=>{
    const [cookies,setCookie,removeCookie] = useCookies(['token'])
    const checkToken = ()=>{
      Axios.post(urlServer+'/user/check_auth',{},{
        headers:{
          'token': cookies.token
        }
      }).catch(err=> removeCookie('token'))
    }
  
    useEffect(()=>{
      checkToken()
    })    
    return(
      <Route
      {...rest}
      render ={()=>
        cookies.token ? 
        children
        :
        <Redirect to="/login" />
      }
      />
    )
  }

export default ProtectedRoutes
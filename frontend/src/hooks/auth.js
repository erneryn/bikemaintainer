import axios from 'axios';
import { urlServer } from '../config'
import React, { useState, useEffect, useContext, createContext } from 'react'
import { useCookies } from 'react-cookie';

const authContext = createContext()

export function ProvideAuth({children}){
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}> {children} </authContext.Provider>
}

export const useAuth = ()=> useContext(authContext)

function useProvideAuth (){
    const [auth,setAuth] = useState(false)
    const [cookies,setCookie] = useCookies(['token'])

    const checkauth = ()=>{
        axios.post(urlServer+'/user/check_auth',{},{
            headers:{
                'token': cookies.token
            }
        }).then(res =>{
            console.log('checkAuth True')
            setAuth(true)
        }).catch(err=>{
            console.log(err,'>>>>>>>>>>')
        })
    }

    return{
        auth,
        checkauth
    }
}
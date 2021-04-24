import axios from 'axios'
import {urlServer} from '../../config'
import Cookies from 'universal-cookie'
const cookies =  new Cookies()

export const getData = ()=>{
   return dispatch =>{
        axios.post(urlServer + '/customer/get',{},{
            headers: {
                token : cookies.get('token')
            }
        }).then(res=>{
            dispatch({
                type: 'GETBIKEDATA',
                payload: res.data.data
            })
        }).catch(err=>{
            console.log(err,'<<<<<<<<<,')
        })
   }
}
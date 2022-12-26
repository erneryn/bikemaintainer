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
            const data = res.data.data
            const formatedDate = data.map((e)=> {
                e.tanggal = new Date(e.tanggal)
                return e
            })
            dispatch({
                type: 'GETBIKEDATA',
                payload: data
            })
        }).catch(err=>{
            console.log(err,'<<<<<<<<<,')
        })
   }
}
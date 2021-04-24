import { useState, useEffect } from "react";
import validate from './validateinfo'


const useForm = (callback) =>{
    const [values,setValues] = useState({
        name:'',
        email:'',
        no_handphone:'',
        bike_name:'',
        frame:'',
        crankset:'',
        bb:'',
        chain:'',
        rd:'',
        fd:'',
        shifter:'',
        cassete:'',
        saddle:'',
        handlebars:'',
        stem:'',
        seatpost:'',
        brake:'',
        ws:'',
        tire:''
    })

    const [errors,setErrors] = useState({})
    const [submit,setSubmit] = useState(false)

    const initValues = (serviceData)=>{
        setErrors({})
        let dt = serviceData.drivetrain
        let cp = serviceData.cockpit
        let ws = serviceData.wheelset
        setValues({
          name: serviceData.name,
          email:serviceData.email,
          bike_name: serviceData.bike_name,
          no_handphone: serviceData.no_handphone,
          frame: serviceData.frame,
          crankset: dt.crankset,
          bb: dt.bb,
          chain: dt.chain,
          rd: dt.rd,
          fd: dt.fd,
          shifter: dt.shifter,
          cassete: dt.cassete,
          saddle: cp.saddle,
          handlebars: cp.handlebars,
          stem: cp.stem ? cp.stem : "",
          seatpost: cp.seatpost ? cp.seatpost : "",
          brake: serviceData.brake,
          ws: ws.ws,
          tire: ws.tire,
         });
         setSubmit(false)
    }

    const handleChange = (e) => {
        const { name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setErrors(validate(values))
        setSubmit(true)
    }

    useEffect(()=>{
        //default submit false 
        if(Object.keys(errors).length === 0 && submit){
            callback()
        }
    },[errors])

    return {
        handleChange,
        values,
        handleSubmit,
        errors,
        initValues
    }
}

export default useForm;

/*
    {
    "name":"SEHL",
    "email":"sehl@gmail.com",
    "no_handphone":"08536051111",
    "bike_name":"SPECIALIZED",
    "frame":"FACT 12r carbon fiber, Rider-First Engineered™, OSBB, clean routing, internally integrated seat clamp, 12x142mm thru-axle, flat-mount disc",
    "drivetrain":{
        "crankset": "SHIMANO DURA-ACE 36-52T",
        "chain":"shimano Dura-ace 11speed",
        "rd":"Shimano Dura-ace Di2",
        "fd":"Shimano Dura-ace Di2",
        "shifter": "Shimano Dura-ace Disc",
        "cassete": "11-30t",
        "bb":"OSBB,Ceramic Speed"
    },
    "cockpit":{
        "saddle": "S-Works Body Geometry",
        "handlebars": "S-works aerofly",
        "seatpost":"S-Works",
        "stem":"SW SL"
    },
    "brake":"Shimano Dura-Ace",
    "wheelset": {
        "ws": "ZIPP NSW 40mm",
        "tire": "continental GP 8000 25c"
    }
    
}

*/
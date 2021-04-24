import { useState, useEffect } from "react";
import useForm  from "../hooks/useForm"
import axios from 'axios';
import { urlServer } from "../config";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";


const BikeSpecs = ({ serviceData, FetchData }) => {
  const {handleChange, handleSubmit, values, errors, initValues } = useForm(submitEdit)
  const [cookies] = useCookies(["token"]);

  const [edit, setEdit] = useState(false);
  const {id} = useParams();
  const [editValue, setEditValue] = useState({
    name:"",
    email:"",
    no_handphone:"",
    bike_name:"",
    frame: "",
    crankset: "",
    bb: "",
    chain: "",
    rd: "",
    fd: "",
    shifter: "",
    cassete: "",
    saddle: "",
    handlebars: "",
    stem: "",
    seatpost: "",
    brake: "",
    ws: "",
    tire: "",
  });

  const submit_edit = () =>{
    console.log('tet')
    FetchData()
  }

  function submitEdit(){
    console.log(values)
    axios.post(urlServer+"/customer/edit-specs",{
      id,
      frame: values.frame,
      drivetrain : {
        crankset: values.crankset,
        chain: values.chain,
        rd: values.rd,
        fd: values.fd,
        shifter: values.shifter,
        cassete: values.cassete,
        bb: values.bb
      },
      cockpit: {
        handlebars: values.handlebars,
        saddle: values.saddle,
        stem: values.stem ? values.stem : "",
        seatpost: values.seatpost ? values.seatpost : ""
      },
      wheelset:{
        ws: values.ws,
        tire: values.tire
      },
      brake: values.brake
    },{
      headers: {
        token: cookies.token
      }
    }).then(resp=>{

      FetchData()
      setEdit(false)
    }).catch(error=>{
      alert('something was wrong')
    })
  }
  
  const openEdit = ()=>{
    initValues(serviceData)
    setEdit(true)
  }

  const handleOnClose = () =>{
    setEdit(false)
    initValues(serviceData)
  }

  useEffect(() => { 
   if(serviceData.length !== 0){
     let dt = serviceData.drivetrain
     let cp = serviceData.cockpit
     let ws = serviceData.wheelset
     setEditValue({
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
      
    }
  }, [serviceData]);

  return (
    <>
      {serviceData && (
        <div className="mx-12 xl:mx-48 mt-4 bg-white rounded-3xl px-5 py-3 relative">
          <h1 className="text-2xl text-center font-medium">SPECIFICATIONS</h1>
          <form className="xl:flex mt-5" onSubmit={handleSubmit}>
            <div className="xl:w-6/12 ">
              <div className="flex mb-2">
                <div className="w-3/12">
                  <h1 className="font-medium text-xs xl:text-base">FRAME</h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                  {edit ? (
                    <>
                    <input
                      type="text"
                      id="frame"
                      name="frame"
                      onChange={handleChange}
                      value={values.frame}
                      className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.frame && <span className="text-red-400">Frame Name Required</span>}
                    </>
                  ) : (
                    <h1 className="text-xs xl:text-base">{editValue.frame}</h1>
                  )}
                </div>
              </div>
              {/* DRIVETRAIN */}
              <div className="flex mb-2">
                <div className="w-3/12">
                  <h1 className="font-medium text-xs xl:text-base">
                    DRIVETRAIN
                  </h1>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">CRANKSET</h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                    <>
                    <input
                      type="text"
                      id="crankset"
                      name="crankset"
                      onChange={handleChange}
                      value={values.crankset}
                      className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.crankset && <span className="text-red-400">Crankset Name Required</span>}
                    </>
                  ) : (
                    <h1 className="text-xs xl:text-base">{editValue.crankset}</h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    BOTTOM BRACKET
                  </h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                   <>
                   <input
                     type="text"
                     id="bb"
                     name="bb"
                     onChange={handleChange}
                     value={values.bb}
                     className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                     />
                     {errors.bb && <span className="text-red-400">bb Name Required</span>}
                   </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.bb}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    FRONT DERAILLEUR{" "}
                  </h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                  <>
                  <input
                    type="text"
                    id="fd"
                    name="fd"
                    onChange={handleChange}
                    value={values.fd}
                    className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.fd && <span className="text-red-400">fd Name Required</span>}
                  </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.fd}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    REAR DERAILLEUR{" "}
                  </h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                  <>
                  <input
                    type="text"
                    id="rd"
                    name="rd"
                    onChange={handleChange}
                    value={values.rd}
                    className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.rd && <span className="text-red-400">rd Name Required</span>}
                  </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.rd}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">CHAIN</h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                    <>
                    <input
                      type="text"
                      id="chain"
                      name="chain"
                      onChange={handleChange}
                      value={values.chain}
                      className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.chain && <span className="text-red-400">chain Name Required</span>}
                    </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.chain}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">CASSETE</h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                 <>
                 <input
                   type="text"
                   id="cassete"
                   name="cassete"
                   onChange={handleChange}
                   value={values.cassete}
                   className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                   />
                   {errors.cassete && <span className="text-red-400">cassete Name Required</span>}
                 </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.cassete}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    SHIFT LEVERS
                  </h1>
                </div>
                <div className="w-9/12 pl-4 pr-3 xl:pl-1">
                {edit ? (
                 <>
                 <input
                   type="text"
                   id="shifter"
                   name="shifter"
                   onChange={handleChange}
                   value={values.shifter}
                   className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                   />
                   {errors.shifter && <span className="text-red-400">shifter Name Required</span>}
                 </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.shifter}
                    </h1>
                  )}
                </div>
              </div>
              {/* END DRIVETRAIN */}
            </div>
            <div className="xl:w-6/12">
              <div className="flex mb-2">
                <div className="w-3/12">
                  <h1 className="font-medium text-xs xl:text-base">COCKPIT</h1>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    HANDLEBAR{" "}
                  </h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                 <>
                 <input
                   type="text"
                   id="handlebars"
                   name="handlebars"
                   onChange={handleChange}
                   value={values.handlebars}
                   className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                   />
                   {errors.handlebars && <span className="text-red-400">handlebars Name Required</span>}
                 </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.handlebars}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">STEM </h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                  <input
                    type="text"
                    id="stem"
                    name="stem"
                    onChange={handleChange}
                    value={values.stem}
                    className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.stem}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">SEATPOST</h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                  {edit ? (
                    <input
                    type="text"
                    id="seatpost"
                    name="seatpost"
                    onChange={handleChange}
                    value={values.seatpost}
                    className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.seatpost}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">SADDLE</h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                <>
                <input
                  type="text"
                  id="saddle"
                  name="saddle"
                  onChange={handleChange}
                  value={values.saddle}
                  className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.saddle && <span className="text-red-400">saddle Name Required</span>}
                </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.saddle}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12">
                  <h1 className="font-medium text-xs xl:text-base">BRAKE</h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                  <>
                  <input
                    type="text"
                    id="brake"
                    name="brake"
                    onChange={handleChange}
                    value={values.brake}
                    className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.brake && <span className="text-red-400">brake Name Required</span>}
                  </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.brake}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12">
                  <h1 className="font-medium text-xs xl:text-base">WHEELSET</h1>
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">
                    Rims And Hub{" "}
                  </h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                    <>
                    <input
                      type="text"
                      id="ws"
                      name="ws"
                      onChange={handleChange}
                      value={values.ws}
                      className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                      />
                      {errors.ws && <span className="text-red-400">ws Name Required</span>}
                    </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.ws}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex mb-2">
                <div className="w-3/12 xl:pl-4">
                  <h1 className="opacity-60 text-xs xl:text-base">Tires </h1>
                </div>
                <div className="w-9/12 pl-4 xl:pl-1">
                {edit ? (
                   <>
                   <input
                     type="text"
                     id="tire"
                     name="tire"
                     onChange={handleChange}
                     value={values.tire}
                     className="w-full text-base px-6 py-1 border-gray-600 bg-gray-200 rounded-2xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                     />
                     {errors.tire && <span className="text-red-400">tire Name Required</span>}
                   </>
                  ) : (
                    <h1 className="text-xs xl:text-base">
                      {editValue.tire}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          {edit ? (
            <div className="absolute top-0 right-0 mr-10">
                <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-5 rounded-2xl mt-5 mr-3"
              >
                Ok
              </button>
              <button
                onClick={handleOnClose}
                className="bg-gray-200 py-2 px-5 rounded-2xl mt-5"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
            {
              id &&
              <button
              onClick={() => openEdit()}
              className="bg-gray-600 text-white px-3 rounded-lg flex py-2 absolute top-0 right-0 mr-10 mt-5"
              >
              <span className="mr-2">
              <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <g clipPath="url(#clip0)">
              <path
              d="M15.8333 10.0384C15.3725 10.0384 15 10.4118 15 10.8717V17.5384C15 17.9976 14.6266 18.3717 14.1667 18.3717H2.5C2.03995 18.3717 1.66672 17.9976 1.66672 17.5384V5.8717C1.66672 5.41257 2.03995 5.03842 2.5 5.03842H9.16672C9.62753 5.03842 10 4.66504 10 4.20514C10 3.74509 9.62753 3.3717 9.16672 3.3717H2.5C1.12167 3.3717 0 4.49338 0 5.8717V17.5384C0 18.9167 1.12167 20.0384 2.5 20.0384H14.1667C15.545 20.0384 16.6667 18.9167 16.6667 17.5384V10.8717C16.6667 10.4109 16.2941 10.0384 15.8333 10.0384Z"
              fill="white"
              />
              <path
              d="M7.81319 9.27936C7.75491 9.33765 7.71569 9.4118 7.69906 9.49176L7.10992 12.4385C7.08245 12.5751 7.12579 12.7159 7.22405 12.8151C7.30325 12.8943 7.40991 12.9367 7.51916 12.9367C7.54571 12.9367 7.57333 12.9343 7.60079 12.9285L10.5467 12.3394C10.6283 12.3226 10.7024 12.2835 10.76 12.2251L17.3533 5.63174L14.4074 2.68604L7.81319 9.27936Z"
              fill="white"
              />
              <path
              d="M19.3899 0.648521C18.5775 -0.164009 17.2558 -0.164009 16.444 0.648521L15.2908 1.80178L18.2366 4.74764L19.3899 3.59423C19.7833 3.20177 19.9999 2.6784 19.9999 2.12176C19.9999 1.56512 19.7833 1.04174 19.3899 0.648521Z"
              fill="white"
              />
              </g>
              <defs>
              <clipPath id="clip0">
                      <rect width="20" height="20" fill="white" />
                      </clipPath>
                      </defs>
                      </svg>
                      </span>
                      Edit
                      </button>
                  }
                  </>
          )}
          </form> 
        </div>
      )}
    </>
  );
};

export default BikeSpecs;

import axios from "axios";
import { urlServer } from "../config";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch } from "react-redux";
import { getData } from "../store/action";

const Alert = (props) => {
  return <MuiAlert  elevation={6} variant="filled" {...props} />;
};

const ServiceModal = (props) => {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();

  const [snackBar, setSnackBar] = useState(false);

  const [part, setPart] = useState("");
  const [parts, setParts] = useState([]);


  const addToParts = () => {
    if (parts.length == 0) {
      if(part !== "") setParts([part]);
    } else {
      setParts([...parts, part]);
    }
    setPart("");
  };
  const removeFromParts = (e) => {
    setParts(parts.filter((el) => el != e));
  };
  
  const [action, setaction] = useState("");
  const [actions, setactions] = useState([]);
  const [validationAction,setValidationAction] = useState(true)
  const addToactions = () => {
    if (actions.length == 0) {
      if(action !== "") setactions([action]);
    } else {
      setactions([...actions, action]);
    }
    setaction("");
  };
  const removeFromactions = (e) => {
    setactions(actions.filter((el) => el != e));
  };
  
  const [notes,setNotes] = useState("")

  
  const [severity, setSeverity] = useState("success");
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };


  useEffect(()=>{
    if(props.data){
      let data = props.data
      setactions(JSON.parse(data.action))
      setParts(JSON.parse(data.part_change))
    }
    console.log(props.data)
    },[props.data])

  const handleSubmit = async (type) => {
    
    const Validation = await new Promise((resolve,reject)=>{
      if(actions.length == 0){
        setValidationAction(false)
        resolve(false)
      } else {
        setValidationAction(true)
        resolve(true)
      }
    })
  
    if (Validation) {
      let data = {
        bike_id : id,
        part_change: parts,
        action:actions,
        notes: notes
      }
    
    let url =""
    if(type == "add") {
      url = "/service/add"
    } else {
      url ="/service/edit"
      data.id = props.data.id
    }

      axios.post(urlServer + url, data,{
        headers: {
          token: cookies.token
        }
      }).then(resp=>{
        props.FetchData()
        setSnackBar(true)
        setTimeout(()=>{
          props.triggerModals(false);
        },2000)
      }).catch(err=>{
        console.log(err)
        setSeverity("error");
        setSnackBar(true);
        alert('error')
      })
    }
  };

  const selectSumbit = () =>{
    if(props.data){
      handleSubmit('edit')
    }else {
      handleSubmit('add')
    }
  }


  return (
    <div>
      <div className="fixed z-40 inset-0 opacity-70 bg-gray-600"></div>
      <div className="fixed z-50 inset-0 flex justify-center items-center">
        <div className="bg-gray-500 w-9/12 md:w-8/12 xl:w-5/12 h-4/5 py-6 rounded-3xl flex items-center justify-start flex-col relative overflow-y-auto">
          <button
            onClick={() => props.triggerModals(false)}
            className="text-2xl text-gray-700 absolute right-0 mr-10  bg-gray-100 opacity-50 h-12 w-12 rounded-full flex items-center justify-center"
          >
            <p>x</p>
          </button>
          <h1 className="text-4xl">{props.type} Service Data</h1>
          <div className="w-3/6 mb-7 border-gray-600 opacity-60 my-2 border-b-2"></div>
          <div className="w-full px-16">
            <div className="mb-5">
              <div className="flex justify-between">
                <h5 className="mb-4">Part Changes :</h5>
              </div>
              <div className="flex rounded-3xl">
                <input
                  onChange={(e) => setPart(e.target.value)}
                  type="text"
                  value={part}
                  placeholder=""
                  className="w-full text-2xl px-6 py-2 border rounded-none rounded-l-3xl placeholder-gray-600 border-gray-600 bg-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></input>
                <button
                  onClick={addToParts}
                  className="text-2xl flex rounded-r-3xl items-center px-6 border border-l-0 border-gray-600 text-white bg-blue-500"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap mt-2">
                {parts.length
                  ? parts.map((e, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-blue-300 pl-5 py-1 pr-1 mx-1 my-1 rounded-md flex"
                        >
                          <h5>{e}</h5>
                          <button
                            onClick={() => removeFromParts(e)}
                            className="ml-1 px-2 bg-blue-200 rounded-full"
                          >
                            x
                          </button>
                        </div>
                      );
                    })
                  : " "}
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between">
                <h5 className="mb-4">Action :</h5>
                {!validationAction && (
                  <p className="text-sm text-red-500">
                    * please insert atleast one action !
                  </p>
                )}
              </div>
              <div className="flex rounded-3xl">
                <input
                  onChange={(e) => setaction(e.target.value)}
                  type="text"
                  value={action}
                  placeholder=""
                  className="w-full text-2xl px-6 py-2 border rounded-none rounded-l-3xl placeholder-gray-600 border-gray-600 bg-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></input>
                <button
                  onClick={addToactions}
                  className="text-2xl flex rounded-r-3xl items-center px-6 border border-l-0 border-gray-600 text-white bg-blue-500"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap mt-2">
                {actions.length
                  ? actions.map((e, idx) => {
                      return (
                        <div
                          key={idx}
                          className="bg-blue-300 pl-5 py-1 pr-1 mx-1 my-1 rounded-md flex"
                        >
                          <h5>{e}</h5>
                          <button
                            onClick={() => removeFromactions(e)}
                            className="ml-1 px-2 bg-blue-200 rounded-full"
                          >
                            x
                          </button>
                        </div>
                      );
                    })
                  : " "}
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between">
                <h5 className="mb-4">Notes :</h5>
              </div>
              <textarea onChange={(e)=> setNotes(e.target.value)} className="resize h-28 border rounded-md w-full text-xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            </div>
            <div>
              <button
                onClick={selectSumbit}
                className="bg-blue-500 rounded-3xl py-3 px-9 text-xl text-gray-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-50 bottom-0 left-0 right-0">
        <Snackbar open={snackBar} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {severity == "success"
              ? `Success add new service Data !`
              : "Error Something Was Wrong !"}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ServiceModal;

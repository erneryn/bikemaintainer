import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import useForm from "../hooks/useForm";
import { useState, useEffect } from "react";
import { urlServer } from "../config";
import { useDispatch } from "react-redux";
import { getData } from "../store/action";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const AddNewCustomer = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    addNewData
  );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [cookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [submitClicked,setSubmitClicked] = useState(false)

  const openDialogFile = () => {
    const input = document.getElementById("file-upload");
    input.click();
  };

  const handleOnChangeFile = (e) => {
    if (e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setPreview(file);
      setFile(e.target.files[0]);
    } else {
      setFile(null);
      setPreview("");
    }
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  function addNewData() {
    setSubmitClicked(true)
    const Form = new FormData();
    Form.append("name", values.name);
    Form.append("email", values.email);
    Form.append('bike_name',values.bike_name);
    let no_handphone = values.no_handphone
    let formated_no_hp = no_handphone.replace(/\s+/g, '').trim()
    Form.append("no_handphone", formated_no_hp);
    Form.append("bikeImage", file);
    Form.append("frame", values.frame);
    let drivetrain = {
      crankset: values.crankset,
      chain: values.chain,
      rd: values.rd,
      fd: values.fd,
      shifter: values.shifter,
      cassete: values.cassete,
      bb: values.bb,
    };
    Form.append("drivetrain", JSON.stringify(drivetrain));
    let cockpit = {
      saddle: values.saddle,
      handlebars: values.handlebars,
      seatpost: values.seatpost || "",
      stem: values.stem || "",
    };
    Form.append("cockpit", JSON.stringify(cockpit));
    Form.append("brake", values.brake);
    let wheelset = {
      ws: values.ws,
      tire: values.tire,
    };
    Form.append("wheelset", JSON.stringify(wheelset));

    axios
      .post(urlServer + "/customer/add", Form, {
        headers: {
          token: cookies.token,
        },
      })
      .then((resp) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        setSubmitClicked(false)
        setOpen(true)
      });
  }

  return (
    <AdminLayout>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Something Was Wrong !
        </Alert>
      </Snackbar>
      {/* CONTAINER */}
      <div className="flex justify-center items-center">
        {/* FORM BOX */}
        <div className="bg-gray-500 rounded-2xl py-4 px-10 flex flex-col justify-center items-center w-8/12">
          {/* TITLE */}
          <h1 className="text-2xl">Add New Customer Data</h1>
          <div className="w-3/6  mb-7 border-gray-600  opacity-60 my-2 border-b-2"></div>
          {/* END TITLE */}
          <div className="w-full px-5 bg-gray-400 rounded-xl">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="font-medium text-xl mt-5">
                Personal Information :
              </h1>
              {/* PERSONAL INFO */}
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Name : *</h1>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Customer Name"
                    value={values.name}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && (
                    <span className="text-red-700">{errors.name}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Email : *</h1>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="cust@exp.com"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <span className="text-red-700">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Phone Number : *</h1>
                  <input
                    type="text"
                    id="phonenumber"
                    name="no_handphone"
                    placeholder="08xxxx"
                    value={values.no_handphone}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.no_handphone && (
                    <span className="text-red-700">{errors.no_handphone}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Bike Brand /Type: *</h1>
                  <input
                    type="text"
                    id="bike_name"
                    name="bike_name"
                    placeholder="Cervelo/Specialized/Canyon  etc.."
                    value={values.bike_name}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.bike_name && (
                    <span className="text-red-700">{errors.bike_name}</span>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <h1>Bike Photo :</h1>
                <input
                  onChange={handleOnChangeFile}
                  id="file-upload"
                  type="file"
                  className="hidden"
                />
                <div className="flex">
                  <div className="w-6/12 pr-4">
                    <button
                      onClick={openDialogFile}
                      type="button"
                      className="w-full focus:outline-none"
                    >
                      <div className="flex cursor-default">
                        <div className="bg-gray-500 border-gray-600 border px-5 py-2 rounded-l-3xl border-r-0 focus:outline-none inline-flex items-center">
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0)">
                              <path
                                d="M31.2051 8.21629H26.9856L24.9212 3.88336C24.6198 3.25097 23.8926 2.79199 23.192 2.79199H10.8081C10.1074 2.79199 9.38023 3.2511 9.07888 3.88361L7.0144 8.21629H2.79488C1.25384 8.21629 0 9.47001 0 11.0112V25.444C0 26.9852 1.25384 28.2389 2.79488 28.2389H12.0298C12.1588 28.2389 12.2817 28.2126 12.3936 28.1651C14.1815 30.0377 16.6988 31.2079 19.4861 31.2079C22.2733 31.2079 24.7908 30.0378 26.5787 28.1653C26.6903 28.2126 26.8133 28.2389 26.9423 28.2389H31.2052C32.7463 28.2389 34.0001 26.9852 34.0001 25.444V11.0112C34 9.47013 32.7462 8.21629 31.2051 8.21629ZM10.7518 4.70419C10.7698 4.68605 10.8054 4.66369 10.8293 4.65524H23.1708C23.1949 4.66369 23.2307 4.68617 23.2484 4.70431L24.9217 8.21629H9.07826L10.7518 4.70419ZM19.486 29.3448C15.1034 29.3448 11.5379 25.7792 11.5379 21.3966C11.5379 17.0138 15.1034 13.4482 19.486 13.4482C23.8686 13.4482 27.4341 17.0138 27.4341 21.3966C27.4341 25.7792 23.8686 29.3448 19.486 29.3448ZM32.1367 25.4442C32.1367 25.9578 31.7189 26.3758 31.2051 26.3758H27.9352C28.7994 24.915 29.2975 23.2132 29.2975 21.3966C29.2975 15.9864 24.896 11.5849 19.4861 11.5849C14.0761 11.5849 9.67475 15.9864 9.67475 21.3966C9.67475 23.2132 10.1729 24.915 11.037 26.3758H2.79488C2.28112 26.3758 1.86325 25.9578 1.86325 25.4442V11.0112C1.86325 10.4975 2.28112 10.0795 2.79488 10.0795H31.2051C31.7189 10.0795 32.1367 10.4975 32.1367 11.0112V25.4442Z"
                                fill="#A5A5A5"
                              />
                              <path
                                d="M19.4861 16.02C16.5217 16.02 14.1099 18.4319 14.1099 21.3964C14.1099 24.3609 16.5217 26.7728 19.4861 26.7728C22.4506 26.7728 24.8624 24.3609 24.8624 21.3964C24.8624 18.4318 22.4506 16.02 19.4861 16.02ZM19.4861 24.9096C17.5489 24.9096 15.9731 23.3335 15.9731 21.3964C15.9731 19.4592 17.5491 17.8833 19.4861 17.8833C21.4233 17.8833 22.9992 19.4593 22.9992 21.3964C22.9992 23.3335 21.4233 24.9096 19.4861 24.9096Z"
                                fill="#A5A5A5"
                              />
                              <path
                                d="M8.54423 11.3643H4.79698C4.11205 11.3643 3.55481 11.9215 3.55481 12.6064V14.3596C3.55481 15.0446 4.11205 15.6018 4.79698 15.6018H8.54423C9.22916 15.6018 9.7864 15.0446 9.7864 14.3596V12.6064C9.7864 11.9215 9.22916 11.3643 8.54423 11.3643ZM8.54249 14.3596H4.79698V12.6064H8.54423L8.54249 14.3596ZM8.54423 14.9807V14.3596H8.54435L8.54423 14.9807Z"
                                fill="#A5A5A5"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect width="34" height="34" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="w-full text-2xl px-6 py-2 border rounded-none rounded-r-3xl border-gray-600">
                          <span className="text-xl opacity-60">
                            {file
                              ? file.name
                              : "maximum size file 1MB , JPEG or PNG"}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div className="w-6/12">
                    {file && (
                      <img
                        src={preview}
                        id="image-preview"
                        width="200"
                      />
                    )}
                  </div>
                </div>
              </div>
              {/* END PERSONAL INFO */}
              <h1 className="font-medium text-xl mt-5">Bike Specification :</h1>
              {/* BIKE SPEC */}
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Frame : *</h1>
                  <input
                    type="text"
                    id="frame"
                    name="frame"
                    placeholder="framebrand/size/type/material"
                    value={values.frame}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.frame && (
                    <span className="text-red-700">{errors.frame}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Crankset : *</h1>
                  <input
                    type="text"
                    id="crankset"
                    name="crankset"
                    placeholder="crank type/length arm/chairing size"
                    value={values.crankset}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.crankset && (
                    <span className="text-red-700">{errors.crankset}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Bottom Bracket : *</h1>
                  <input
                    type="text"
                    id="bb"
                    name="bb"
                    placeholder=""
                    value={values.bb}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.bb && (
                    <span className="text-red-700">{errors.bb}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Chain : *</h1>
                  <input
                    type="text"
                    id="chain"
                    name="chain"
                    placeholder=""
                    value={values.chain}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.chain && (
                    <span className="text-red-700">{errors.chain}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Rear Derailleur : *</h1>
                  <input
                    type="text"
                    id="rd"
                    name="rd"
                    placeholder=""
                    value={values.rd}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.rd && (
                    <span className="text-red-700">{errors.rd}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Front Derailleur : *</h1>
                  <input
                    type="text"
                    id="fd"
                    name="fd"
                    placeholder=""
                    value={values.fd}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.fd && (
                    <span className="text-red-700">{errors.fd}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Shifter : *</h1>
                  <input
                    type="text"
                    id="shifter"
                    name="shifter"
                    placeholder=""
                    value={values.shifter}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.shifter && (
                    <span className="text-red-700">{errors.shifter}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Cassete : *</h1>
                  <input
                    type="text"
                    id="cassete"
                    name="cassete"
                    placeholder=""
                    value={values.cassete}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.cassete && (
                    <span className="text-red-700">{errors.cassete}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Saddle : *</h1>
                  <input
                    type="text"
                    id="saddle"
                    name="saddle"
                    placeholder=""
                    value={values.saddle}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.saddle && (
                    <span className="text-red-700">{errors.saddle}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Handlebars : *</h1>
                  <input
                    type="text"
                    id="handlebars"
                    name="handlebars"
                    placeholder="Handlebar Type/width"
                    value={values.handlebars}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.handlebars && (
                    <span className="text-red-700">{errors.handlebars}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Stem : </h1>
                  <input
                    type="text"
                    id="stem"
                    name="stem"
                    placeholder="stem length/angle"
                    value={values.stem}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.stem && (
                    <span className="text-red-700">{errors.stem}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Seatpost : *</h1>
                  <input
                    type="text"
                    id="seatpost"
                    name="seatpost"
                    placeholder=""
                    value={values.seatpost}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.seatpost && (
                    <span className="text-red-700">{errors.seatpost}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Wheelset : *</h1>
                  <input
                    type="text"
                    id="ws"
                    name="ws"
                    placeholder=""
                    value={values.ws}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.ws && (
                    <span className="text-red-700">{errors.ws}</span>
                  )}
                </div>
                <div className="w-6/12">
                  <h1>Tire : *</h1>
                  <input
                    type="text"
                    id="tire"
                    name="tire"
                    placeholder=""
                    value={values.tire}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.tire && (
                    <span className="text-red-700">{errors.tire}</span>
                  )}
                </div>
              </div>
              <div className="mt-5 flex justify-between w-full">
                <div className="w-6/12 pr-4">
                  <h1>Brakes : *</h1>
                  <input
                    type="text"
                    id="brake"
                    name="brake"
                    placeholder=""
                    value={values.brake}
                    onChange={handleChange}
                    className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.brake && (
                    <span className="text-red-700">{errors.brake}</span>
                  )}
                </div>
              </div>
              {/* END BIKE SPECS */}
              {
                submitClicked ?
                <span>Waiting...</span> 
                :
                <button
                type="submit"
                className="bg-blue-500 rounded-3xl py-3 px-9 my-4 text-xl text-gray-400"
                >
                Add New
              </button>
              }
            </form>
          </div>
        </div>
        {/* END FORM BOX */}
      </div>
      {/* END CONTAINER */}
    </AdminLayout>
  );
};

export default AddNewCustomer;

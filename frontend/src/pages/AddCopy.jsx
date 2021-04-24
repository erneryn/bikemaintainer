import axios from "axios";
import { urlServer } from "../config";
import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch } from "react-redux";
import { getData } from "../store/action";
import AdminLayout from "../layout/AdminLayout";
import { Link } from "react-router-dom";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AddNewPage = (props) => {
  const [cookies] = useCookies(["token"]);

  const [snackBar, setSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar(false);
  };

  const handleUpload = () => {
    const input = document.getElementById("file-upload");
    input.click();
    input.onchange = (e) => {
      setFile(e.target.files[0]);
    };
  };

  const ValidationElement = () => {
    return <p className="text-sm text-red-500">* required customer's name</p>;
  };

  const handleSubmit = () => {
    setValidationName(true);

    // name == null || name == ""
    //   ? setValidationName(false)
    //   : setValidationName(true);

    // phone == null || phone == ""
    //   ? setValidationPhone(false)
    //   : setValidationPhone(true);

    // bikeBrand == null || bikeBrand == ""
    //   ? setValidationBrand(false)
    //   : setValidationBrand(true);

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // re.test(String(email).toLocaleLowerCase())
    //   ? setValidationEmail(true)
    //   : setValidationEmail(false);

    // frame == null || frame == ""
    //   ? setValidationFrame(false)
    //   : setValidationFrame(true);

    // drivetrain.crankset == "" || !drivetrain.hasOwnProperty("crankset")
    //   ? setValidationCrank(false)
    //   : setValidationCrank(true);
    // drivetrain.bb == "" || !drivetrain.hasOwnProperty("bb")
    //   ? setValidationBB(false)
    //   : setValidationBB(true);
    // drivetrain.chain == "" || !drivetrain.hasOwnProperty("chain")
    //   ? setValidationChain(false)
    //   : setValidationChain(true);
    // drivetrain.rd == "" || !drivetrain.hasOwnProperty("rd")
    //   ? setValidationRD(false)
    //   : setValidationRD(true);
    // drivetrain.fd == "" || !drivetrain.hasOwnProperty("fd")
    //   ? setValidationFD(false)
    //   : setValidationFD(true);
    // drivetrain.cassete == "" || !drivetrain.hasOwnProperty("cassete")
    //   ? setValidationCassete(false)
    //   : setValidationCassete(true);
    // drivetrain.shifter== "" || !drivetrain.hasOwnProperty("shifter")
    //   ? setValidationShifter(false)
    //   : setValidationShifter(true);

    // let Validation = new Promise((resolve, reject) => {
    //   let status = true
    //   validationName == false && (status=false)
    //   resolve(status)
    //   if (validationName == false ||
    //     validationEmail == false ||
    //     validationPhone == false ||
    //     validationBrand == false ||
    //     validationFrame == false ||
    //     validationCrank == false ||
    //     validationBB == false ||
    //     validationRD == false ||
    //     validationFD == false ||
    //     validationChain == false ||
    //     validationCassete == false ||
    //     validationShifter == false
    //   ) {
    //     status = false
    //   }
    //    resolve(status)
    // });

    let Validation = false;
    if (Validation) {
      const Form = new FormData();
      Form.append("name", name);
      Form.append("email", email);
      Form.append("no_handphone", phone);
      Form.append("bike_name", bikeBrand);
      Form.append("bikeImage", file);
      Form.append("frame", frame);
      Form.append("drivetrain", drivetrain);
      Form.append("cockpit", cockpit);
      Form.append("brake", brake);
      Form.append("wheelset", wheelset);

      alert("true");
      // axios
      //   .post(urlServer + "/customer/add", Form, {
      //     headers: {
      //       token: cookies.token,
      //     },
      //   })
      //   .then((resp) => {
      //     dispatch(getData());
      //     //   setSnackBar(true);
      //     //   setTimeout(() => {
      //     //     props.triggerModals(false);
      //     //   }, 2500);
      //   })
      //   .catch((err) => {
      //     setSeverity("error");
      //     setSnackBar(true);
      //   });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-center items-center">
        <div className="bg-gray-500 rounded-2xl py-4 flex items-center justify-start flex-col relative">
          <h1 className="text-4xl">New Customer's Bike</h1>
          <div className="w-3/6  mb-7 border-gray-600  opacity-60 my-2 border-b-2"></div>
          <div className="w-full px-16">
            <form>
              {/* PERSONAL INFO */}
              <div className="w-full px-4 bg-gray-400 p-2 rounded-xl mr-5">
                <h1 className="font-medium text-xl mb-5">
                  Personal Information :
                </h1>
                <div className="flex">
                  {/* Personal info LEFT */}
                  <div className="w-full px-2">
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Name: *</h5>
                      </div>
                      <input
                        // onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="customer's Name"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Email: *</h5>\
                      </div>
                      <input
                        // onChange={(e) => setemail(e.target.value)}
                        type="email"
                        placeholder="email@example.com"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Phone Number: *</h5>
                      </div>
                      <div className="flex rounded-3xl">
                        <span className="text-2xl inline-flex rounded-l-3xl items-center px-6 border border-r-0 border-gray-600 text-gray-600">
                          +62
                        </span>
                        <input
                          // onChange={(e) => setPhone(e.target.value)}
                          type="text"
                          className="w-full text-2xl px-6 py-2 border rounded-none rounded-r-3xl placeholder-gray-600 border-gray-600 bg-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        ></input>
                      </div>
                    </div>
                  </div>
                  {/* END LEFT */}
                  {/* PERSONAL INFO RIGHT */}
                  <div className="w-full px-2">
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Bike Brand/Type: *</h5>
                      </div>
                      <input
                        // onChange={(e) => setBikeBrand(e.target.value)}
                        placeholder=""
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-1">Bike Photo:</h5>
                      <div className="flex rounded-3xl">
                        <button
                          onClick={handleUpload}
                          className="bg-gray-500 border-gray-600 border px-5 py-2 rounded-l-3xl border-r-0 focus:outline-none inline-flex items-center"
                        >
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
                        </button>
                        <div className="w-full text-2xl px-6 py-2 border rounded-none rounded-r-3xl border-gray-600">
                          <span className="text-xl opacity-60">
                            {file
                              ? file.name
                              : "maximum size file 1MB , JPEG or PNG"}
                          </span>
                        </div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        className="hidden"
                      ></input>
                    </div>
                  </div>
                  {/* END RIGHT */}
                </div>
              </div>
              {/* END PERSONAL INFO */}

              {/* START BIKE SPECS */}
              <div className="w-full h-2/6 px-4 bg-gray-400 pt-2 rounded-xl mr-5 mt-2">
                <h1 className="font-medium text-xl mb-5">
                  Bike Specification:
                </h1>
                <div className="flex overflow-y-auto h-3/4">
                  {/* BIKE SPECS LEFT */}
                  <div className="w-full px-2">
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Frame:*</h5>
                      </div>
                      <input
                        // onChange={(e) => setFrame(e.target.value)}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Crankset:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "crankset")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Bottom Bracket:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "bb")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Rear Derailleur:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "rd")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Front Derailleur:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "fd")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Chain:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "chain")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Cassete:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "cassete")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Shifter:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeDrivetrain(e, "shifter")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>
                  </div>
                  {/* END LEFT */}
                  {/* BIKE SPECS RIGHT */}
                  <div className="w-full">
                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Brake:</h5>
                      </div>
                      <input
                        // onChange={(e) => setBrake(e.target.value)}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Saddle:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeCokcpit(e, "saddle")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Handlebar:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeCokcpit(e, "handlebars")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Stem:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeCokcpit(e, "stem")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Seat Post:</h5>
                      </div>
                      <input
                        // onChange={(e) => onChangeCokcpit(e, "seatpost")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Wheelset:</h5>
                      </div>
                      <input
                        onChange={(e) => onChangeWheelset(e, "ws")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between">
                        <h5 className="mb-1">Tires:</h5>
                      </div>
                      <input
                        onChange={(e) => onChangeWheelset(e, "tire")}
                        type="text"
                        className="w-full text-2xl px-6 py-2 border placeholder-gray-600 border-gray-600 bg-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></input>
                    </div>
                  </div>
                  {/* END  RIGHT */}
                </div>
              </div>
              <div className="my-5">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 rounded-3xl py-3 px-9 text-xl text-gray-400"
                >
                  Save
                </button>
                <Link to="/dashboard">
                  <button
                    onClick={handleSubmit}
                    className="bg-red-300 ml-3 rounded-3xl py-3 px-9 text-xl text-gray-400"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute z-50 bottom-0 left-0 right-0">
        <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {severity == "success"
              ? `Success add new Customers !`
              : "Error Something Was Wrong !"}
          </Alert>
        </Snackbar>
      </div>
      <Link to="/dashboard">
        <button className="bg-gray-700 text-white fixed bottom-6 ml-3">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.705 16.59L11.125 12L15.705 7.41L14.295 6L8.295 12L14.295 18L15.705 16.59Z"
              fill="#FEFEFD"
            />
          </svg>
        </button>
      </Link>
    </AdminLayout>
  );
};

export default AddNewPage;

import QRcode from "qrcode";
import { useState, useEffect } from "react";
import axios from "axios";
import { urlServer, domain } from "../config";
import { useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";


import DialogDelete from './DialogDelete'

export default function DetailHeader({ serviceData, FetchData }) {
  const [cookies] = useCookies(["token"]);
  const [qrCodeLink, SetQrCode] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [showEdit, SetShowEdit] = useState(false);
  const [editImage, setShowEditImage] = useState(false);

  const [name, setName] = useState("");
  const [bikeName, setBikeName] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");

  const [editValue,setEditValue] = useState({})

  const [confirm,setConfirm] = useState(false);
  const [confirmCust,setConfirmCust] = useState(false);


  const { id } = useParams();
  const history = useHistory()

  const GenerateQRCode = async () => {
    if (serviceData.qr_code) {
      const link = await QRcode.toDataURL("https://rucciartcycles.com/customer/"+serviceData.qr_code);
      SetQrCode(link);
    }
  };

  const GenerateDate = async () => {
    if (serviceData.history) {
      if (serviceData.history.length !== 0) {
        let date = serviceData.history[0].created;
        let fullDate = new Date(date);
        let day = fullDate.getDate().toString().padStart(2, "0");
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let month = monthNames[fullDate.getMonth()];
        let year = fullDate.getFullYear();
        setServiceDate(`${day} ${month} ${year}`);
      }
    }
  };

  const handleChangePersonal = (e) =>{
    const { name, value } = e.target
    setEditValue({
      ...editValue,
      [name]: value
    })
  }

  const handleSubmit = () => {
    axios.post(urlServer + "/customer/edit", {
      id,
      name : editValue.name,
      email: editValue.email,
      no_handphone: editValue.no_handphone,
      bike_name: editValue.bike_name,
    },{
      headers: {
        token: cookies.token
      }
    }).then(resp=>{
      FetchData()
      SetShowEdit(false)
    }).catch(err=>{
      alert('error')
    });
  };

  const DeleteImage = () => {
    setConfirm(false)
    let key = serviceData.image_url.slice(8).split("/")[1];

    axios
      .post(
        urlServer + "/customer/delete_s3",
        {
          id,
          key,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then(() => {
        FetchData();
      })
      .catch(() => {
        alert("error");
      });
  };

  const handleUpload = () => {
    const input = document.getElementById("file-upload");
    input.click();
  };

  const handleOnchangeFile = (e) => {
    if (e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setFilePreview(file)
      setFile(e.target.files[0]);
    } else {
      setFilePreview("");
      setFile(null);
    }
  };

  const closeEditImage = () =>{
    setShowEditImage(false)
    setFile(null)
  }

  const closeDialog = () =>{
    setConfirm(false)
  }

  const DeleteAllData = () =>{
    axios.post(urlServer+"/customer/delete/"+id,{},{
      headers: {
        token: cookies.token
      }
    }).then(resp=>{
      history.push('/dashboard')
    }).catch(err=>{
      console.log(err)
      alert('error')
    })
  }

  const closeDialogCust = () =>{
    setConfirmCust(false)
  }
  
  const submitUpload = () =>{
 
    const Form = new FormData();
    Form.append('bikeImage',file);
    Form.append('id_customer',id);
    axios.post(urlServer + "/customer/update_photo", Form, {
      headers: {
        token : cookies.token
      }
    }).then((resp)=>{
      FetchData();
      setFile(null);
      setShowEditImage(false)
    }).catch(err=>{
      alert('error')
      console.log('error')
    })

  }

  const downloadQr = ()=>{
    const link = document.createElement('a')
    link.href = qrCodeLink
    link.setAttribute('download', `${serviceData.name}_${serviceData.bike_name}.png`)
    document.body.appendChild(link);
    link.click()
  }


  useEffect(() => {
    setEditValue(serviceData);
  }, [showEdit]);

  useEffect(() => {
    const baseSetUp = ()=>{
      setEditValue(serviceData)
      GenerateDate();
      GenerateQRCode()
    }
    baseSetUp()
  }, [serviceData]);

  return (
    <div>
      <div className="flex justify-center mx-16 xl:mx-36">
        <div className="relative">
          {
            <img
              src={
                serviceData.image_url
                  ? serviceData.image_url
                  : "/images/no_image.png"
              }
              alt=""
              className="rounded-3xl h-48 xl:h-72 "
            />
          }
          <button
            onClick={() => setShowEditImage(true)}
            className="bg-yellow-700 text-white py-1 px-3 rounded-3xl absolute top-0 m-3"
          >
            {serviceData.image_url ? "Edit Image" : "Add Image"}
          </button>
          {editImage && (
            <div>
              <div className="rounded-3xl bg-gray-600 opacity-80 h-48 xl:h-72 w-full absolute top-0"></div>
              <div className="rounded-3xl h-48 w-full xl:h-72 absolute z-50 top-0">
                <div className="w-full rounded-3xl h-full flex justify-center items-center">
                  {
                    (!file && !serviceData.image_url) &&     
                    <>                 
                    <button
                      onClick={handleUpload}
                      className="bg-gray-50 py-1 px-2 rounded-2xl text-gray-800 flex items-center absolute"
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
                      <span className="ml-2">new photo</span>
                    </button>
                    <p className="mt-20 text-gray-100">maximum size file 1MB , JPEG or PNG</p>
                    </>
                  }
                  {
                  file && 
                  <>
                    <img
                    id="image-preview"
                    alt=""
                    className="rounded-3xl h-48 xl:h-72 w-full object-cover"
                    src={filePreview}
                    />
                    <button 
                      onClick={()=> submitUpload()}
                     className="bg-red-100 text-white rounded-2xl flex items-center absolute bottom-0 right-0 m-2 py-2 px-6"
                    >
                      Ok
                    </button>
                    </>
                  }
                 
                  <input
                    onChange={(e) => handleOnchangeFile(e)}
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                  ></input>
                  {serviceData.image_url && (
                    <button
                      onClick={() => setConfirm(true)}
                      className="bg-red-600 ml-2 text-white py-1 px-2 rounded-xl"
                    >
                      delete
                    </button>
                  )}
                  <button
                    onClick={() => closeEditImage()}
                    className="text-white text-xl absolute top-0 right-0 mr-5 mt-2"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-8/12 flex relative flex-col justify-center">
          {showEdit && (
            <div className="bg-white flex z-20 absolute right-0 left-0 h-36 xl:h-56 rounded-3xl rounded-l-none p-6">
              <div className="w-6/12 pr-3">
                <p>Name :</p>
                <input
                  onChange={handleChangePersonal}
                  name="name"
                  value={editValue.name}
                  className="w-full text-xl  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 px-2"
                  type="text"
                />
                <p>Bike Name :</p>
                <input
                  onChange={handleChangePersonal}
                  name="bike_name"
                  value={editValue.bike_name}
                  className="w-full text-xl  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 px-2"
                  type="text"
                />
              </div>
              <div className="w-6/12 pr-2">
                <p>Phone Number :</p>
                <input
                  onChange={handleChangePersonal}
                  name="no_handphone"
                  value={editValue.no_handphone}
                  className="w-full text-xl  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 px-2"
                  type="text"
                />

                <p>Email :</p>
                <input
                  onChange={handleChangePersonal}
                  value={editValue.email}
                  name="email"
                  className="w-full text-xl  border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 px-2"
                  type="text"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => SetShowEdit(!showEdit)}
                    className="mr-2 bg-gray-600 text-white py-2 px-10 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmit()}
                    className=" bg-blue-500 text-white px-10 py-2 rounded-xl"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white h-36 xl:h-56 rounded-3xl rounded-l-none p-6">
            <div className="flex">
              <div className="flex flex-col">
                <h1 className="text-2xl xl:text-4xl">{serviceData.name}</h1>
                <h5 className="text-sm xl:text-xl text-gray-600 opacity-50">
                  {serviceData.bike_name} 
                </h5>
              </div>
              <div className="ml-auto"></div>
              <div className="flex flex-row items-center">
                <button 
                onClick={()=> downloadQr()}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg flex mx-2">
                  <span className="mr-2">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 4.68939C14.0377 4.68941 14.0751 4.682 14.1099 4.66758C14.1447 4.65316 14.1764 4.63201 14.2031 4.60535C14.2297 4.57868 14.2509 4.54702 14.2653 4.51218C14.2797 4.47734 14.2871 4.43999 14.2871 4.40228V2.72064C14.2871 2.6445 14.2569 2.57147 14.203 2.51763C14.1492 2.46378 14.0761 2.43353 14 2.43353C13.9239 2.43353 13.8508 2.46378 13.797 2.51763C13.7431 2.57147 13.7129 2.6445 13.7129 2.72064V4.40228C13.7129 4.43999 13.7203 4.47734 13.7347 4.51218C13.7491 4.54702 13.7703 4.57868 13.7969 4.60535C13.8236 4.63201 13.8553 4.65316 13.8901 4.66758C13.9249 4.682 13.9623 4.68941 14 4.68939Z"
                        fill="white"
                      />
                      <path
                        d="M18.9492 6.94805H17.3184V2.95312C17.3184 2.87699 17.2881 2.80399 17.2343 2.75016C17.1805 2.69632 17.1075 2.66606 17.0313 2.66602H15.2709V1.06641C15.2709 0.99026 15.2407 0.917233 15.1868 0.863389C15.133 0.809546 15.06 0.779297 14.9838 0.779297H6.01617C5.94003 0.779297 5.867 0.809546 5.81316 0.863389C5.75931 0.917233 5.72906 0.99026 5.72906 1.06641V2.66602H3.96867C3.89254 2.66606 3.81954 2.69632 3.7657 2.75016C3.71187 2.80399 3.68161 2.87699 3.68156 2.95312V6.94805H2.05078C1.71368 6.94844 1.3905 7.08252 1.15214 7.32089C0.913773 7.55925 0.779688 7.88243 0.779297 8.21953V16.047C0.779688 16.3841 0.913773 16.7072 1.15214 16.9456C1.3905 17.184 1.71368 17.318 2.05078 17.3184H5.72857V19.9336C5.72857 20.0097 5.75882 20.0828 5.81266 20.1366C5.86651 20.1905 5.93953 20.2207 6.01568 20.2207H14.9843C15.0605 20.2207 15.1335 20.1905 15.1873 20.1366C15.2412 20.0828 15.2714 20.0097 15.2714 19.9336V17.3184H18.9492C19.2863 17.318 19.6095 17.184 19.8479 16.9456C20.0862 16.7072 20.2203 16.3841 20.2207 16.047V8.21953C20.2203 7.88243 20.0862 7.55925 19.8479 7.32089C19.6095 7.08252 19.2863 6.94844 18.9492 6.94805ZM16.7442 3.24023V6.94805H15.2709V3.24023H16.7442ZM6.30328 1.35352H14.6967V6.94805H6.30328V1.35352ZM4.25578 3.24023H5.72906V6.94805H4.25578V3.24023ZM4.25578 16.7442V13.8223H5.72857V16.7442H4.25578ZM6.30279 19.6465V13.8223H14.6972C14.6972 13.8223 14.6972 17.0297 14.6972 17.0313C14.6972 17.033 14.6972 19.6465 14.6972 19.6465H6.30279ZM15.2714 16.7442V13.8223H16.7442V16.7442H15.2714ZM19.6465 16.047C19.6463 16.2318 19.5727 16.409 19.442 16.5398C19.3113 16.6705 19.1341 16.744 18.9492 16.7442H17.3184V13.5352C17.3184 13.459 17.2881 13.386 17.2343 13.3322C17.1805 13.2784 17.1075 13.2481 17.0313 13.248H3.96867C3.89254 13.2481 3.81954 13.2784 3.7657 13.3322C3.71187 13.386 3.68161 13.459 3.68156 13.5352V16.7442H2.05078C1.86592 16.744 1.6887 16.6705 1.55798 16.5398C1.42726 16.409 1.35373 16.2318 1.35352 16.047V8.21953C1.35373 8.03467 1.42726 7.85745 1.55798 7.72673C1.6887 7.59601 1.86592 7.52248 2.05078 7.52227H18.9492C19.1341 7.52248 19.3113 7.59601 19.442 7.72673C19.5727 7.85745 19.6463 8.03467 19.6465 8.21953V16.047Z"
                        fill="white"
                      />
                      <path
                        d="M6.61713 8.91614H2.54297C2.46682 8.91614 2.3938 8.94639 2.33995 9.00023C2.28611 9.05407 2.25586 9.1271 2.25586 9.20325C2.25586 9.27939 2.28611 9.35242 2.33995 9.40626C2.3938 9.46011 2.46682 9.49036 2.54297 9.49036H6.61713C6.69328 9.49036 6.76631 9.46011 6.82015 9.40626C6.87399 9.35242 6.90424 9.27939 6.90424 9.20325C6.90424 9.1271 6.87399 9.05407 6.82015 9.00023C6.76631 8.94639 6.69328 8.91614 6.61713 8.91614Z"
                        fill="white"
                      />
                      <path
                        d="M12.9609 14.6426H8.03906C7.96292 14.6426 7.88989 14.6728 7.83605 14.7267C7.7822 14.7805 7.75195 14.8535 7.75195 14.9297C7.75195 15.0058 7.7822 15.0789 7.83605 15.1327C7.88989 15.1865 7.96292 15.2168 8.03906 15.2168H12.9609C13.0371 15.2168 13.1101 15.1865 13.164 15.1327C13.2178 15.0789 13.248 15.0058 13.248 14.9297C13.248 14.8535 13.2178 14.7805 13.164 14.7267C13.1101 14.6728 13.0371 14.6426 12.9609 14.6426Z"
                        fill="white"
                      />
                      <path
                        d="M12.9609 16.1191H8.03906C7.96292 16.1191 7.88989 16.1494 7.83605 16.2032C7.7822 16.2571 7.75195 16.3301 7.75195 16.4062C7.75195 16.4824 7.7822 16.5554 7.83605 16.6093C7.88989 16.6631 7.96292 16.6934 8.03906 16.6934H12.9609C13.0371 16.6934 13.1101 16.6631 13.164 16.6093C13.2178 16.5554 13.248 16.4824 13.248 16.4062C13.248 16.3301 13.2178 16.2571 13.164 16.2032C13.1101 16.1494 13.0371 16.1191 12.9609 16.1191Z"
                        fill="white"
                      />
                      <path
                        d="M12.9609 17.5957H8.03906C7.96292 17.5957 7.88989 17.626 7.83605 17.6798C7.7822 17.7336 7.75195 17.8067 7.75195 17.8828C7.75195 17.959 7.7822 18.032 7.83605 18.0858C7.88989 18.1397 7.96292 18.1699 8.03906 18.1699H12.9609C13.0371 18.1699 13.1101 18.1397 13.164 18.0858C13.2178 18.032 13.248 17.959 13.248 17.8828C13.248 17.8067 13.2178 17.7336 13.164 17.6798C13.1101 17.626 13.0371 17.5957 12.9609 17.5957Z"
                        fill="white"
                      />
                      <path
                        d="M17.9648 8.42395C17.8107 8.42395 17.66 8.46965 17.5319 8.55529C17.4037 8.64092 17.3039 8.76263 17.2449 8.90502C17.1859 9.04742 17.1705 9.20411 17.2005 9.35528C17.2306 9.50645 17.3048 9.64531 17.4138 9.75429C17.5228 9.86328 17.6616 9.9375 17.8128 9.96757C17.964 9.99764 18.1207 9.98221 18.2631 9.92323C18.4055 9.86424 18.5272 9.76436 18.6128 9.6362C18.6984 9.50805 18.7441 9.35738 18.7441 9.20325C18.7439 8.99665 18.6617 8.79858 18.5156 8.65249C18.3695 8.5064 18.1714 8.42421 17.9648 8.42395ZM17.9648 9.40833C17.9243 9.40833 17.8846 9.3963 17.8509 9.37376C17.8172 9.35123 17.7909 9.3192 17.7754 9.28173C17.7599 9.24425 17.7558 9.20302 17.7637 9.16324C17.7716 9.12346 17.7912 9.08692 17.8198 9.05824C17.8485 9.02955 17.8851 9.01002 17.9248 9.00211C17.9646 8.9942 18.0059 8.99826 18.0433 9.01378C18.0808 9.0293 18.1128 9.05559 18.1354 9.08931C18.1579 9.12304 18.1699 9.16269 18.1699 9.20325C18.1699 9.25762 18.1483 9.30976 18.1098 9.34821C18.0714 9.38666 18.0192 9.40828 17.9648 9.40833Z"
                        fill="white"
                      />
                      <path
                        d="M16.0166 8.42395C15.8625 8.42395 15.7118 8.46965 15.5836 8.55529C15.4555 8.64092 15.3556 8.76263 15.2966 8.90502C15.2376 9.04742 15.2222 9.20411 15.2523 9.35528C15.2823 9.50645 15.3566 9.64531 15.4656 9.75429C15.5745 9.86328 15.7134 9.9375 15.8646 9.96757C16.0157 9.99764 16.1724 9.98221 16.3148 9.92323C16.4572 9.86424 16.5789 9.76436 16.6646 9.6362C16.7502 9.50805 16.7959 9.35738 16.7959 9.20325C16.7956 8.99665 16.7135 8.79858 16.5674 8.65249C16.4213 8.5064 16.2232 8.42421 16.0166 8.42395ZM16.0166 9.40833C15.976 9.40833 15.9364 9.3963 15.9027 9.37376C15.8689 9.35123 15.8427 9.3192 15.8271 9.28173C15.8116 9.24425 15.8076 9.20302 15.8155 9.16324C15.8234 9.12346 15.8429 9.08692 15.8716 9.05824C15.9003 9.02955 15.9368 9.01002 15.9766 9.00211C16.0164 8.9942 16.0576 8.99826 16.0951 9.01378C16.1326 9.0293 16.1646 9.05559 16.1871 9.08931C16.2097 9.12304 16.2217 9.16269 16.2217 9.20325C16.2216 9.25762 16.2 9.30976 16.1616 9.34821C16.1231 9.38666 16.071 9.40828 16.0166 9.40833Z"
                        fill="white"
                      />
                      <path
                        d="M14.0684 8.42395C13.9143 8.42395 13.7636 8.46964 13.6355 8.55524C13.5073 8.64084 13.4074 8.76251 13.3484 8.90487C13.2894 9.04723 13.274 9.20389 13.304 9.35504C13.334 9.50619 13.4082 9.64505 13.5171 9.75406C13.626 9.86308 13.7648 9.93735 13.9159 9.96749C14.067 9.99763 14.2237 9.9823 14.3661 9.92341C14.5085 9.86453 14.6303 9.76475 14.716 9.63668C14.8017 9.50861 14.8475 9.35801 14.8477 9.2039C14.8476 8.99719 14.7655 8.79895 14.6193 8.65272C14.4732 8.50649 14.2751 8.42421 14.0684 8.42395ZM14.0684 9.40833C14.0278 9.40833 13.9881 9.39628 13.9544 9.37372C13.9206 9.35115 13.8943 9.31909 13.8788 9.28158C13.8633 9.24406 13.8593 9.2028 13.8673 9.163C13.8752 9.1232 13.8948 9.08666 13.9236 9.058C13.9523 9.02935 13.9889 9.00987 14.0288 9.00203C14.0686 8.99419 14.1098 8.99835 14.1473 9.01397C14.1848 9.02959 14.2167 9.05598 14.2392 9.08979C14.2617 9.1236 14.2736 9.16332 14.2734 9.2039C14.2732 9.25817 14.2515 9.31014 14.2131 9.34844C14.1747 9.38675 14.1226 9.40828 14.0684 9.40833Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  Download QR Code
                </button>
                <button
                  onClick={() => SetShowEdit(!showEdit)}
                  className="bg-red-100 text-white px-3 rounded-lg flex py-2"
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
                </button >
                <button 
                onClick={()=> setConfirmCust(true)}
                className="text-white bg-red-300 rounded-2xl py-2 px-4 ml-2">
                  Delete
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="border-t-2 border-gray-500 xl :pt-5">
                <p className="text-l text-gray-600 opacity-50">
                  {serviceData.no_handphone}
                </p>
                <p className="text-l text-gray-600 opacity-50">
                  {serviceData.email}
                </p>
                <span className="text-gray-700">Qr Code :</span>
                <p>{serviceData.qr_code}</p>
              </div>
              <div>
                <img src={qrCodeLink} alt="" className="h-10 xl:h-28" />
              </div>
              <div className="flex flex-col xl:mt-5">
                <p className="opacity-50">Last Service</p>
                <h1 className="text-xl xl:text-3xl">{serviceDate}</h1>
              </div>
            </div>
            <DialogDelete 
              confirm={confirm}
              closeDialog={closeDialog}
              title="Are you sure to delete this image?"
              desc="deleting this image will permanently disapear from your data !"
              deleteData={()=> DeleteImage()}  
          />
           <DialogDelete 
              confirm={confirmCust}
              closeDialog={closeDialogCust}
              title="Are you sure to delete this customer Data?"
              desc="deleting this customer will permanently disapear from your data !"
              deleteData={()=> DeleteAllData()}  
          />
          </div>
        </div>
      </div>
    </div>
  );
}

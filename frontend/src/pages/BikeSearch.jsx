import React, { useState, useEffect } from "react";
import axios from "axios";
import { urlServer } from "../config";
import { Link } from 'react-router-dom'
import MainLayout from '../layout/mainlayout';

const Search = () => {
  const [QrCode,setQRcode ] = useState('')
  const [data,setData] = useState(null)

  const handleSubmit = async () => {
    try {
      const Search = await axios.post(urlServer + '/customer/get_by_qr/' + QrCode)
      if(Search.data.data.length == 0){
        alert('Data Not Found')
        setData(null)
      } else {
          setData(Search.data.data)
      }
      console.log(Search)
    } catch (error) {}
  };

  useEffect(()=>{
  
  })

  return (
    <MainLayout>
    <div className="xl:w-5/12 md:w-3/4">
      <h1 id="title-seacrh" className="text-4xl mb-4">Search</h1>
      <div className="w-3/6 mb-7 border-gray-600 border-b-2"></div>
      <div className="bg-gray-500 my-2 p-6  rounded-2xl flex flex-col justify-center items-center relative">
        <div className="w-full">
          <p className="mb-2">Your Qr Code Number :</p>
          <input
            type="email"
            onChange={(e) => setQRcode(e.target.value)}
            className="rounded-lg h-12 w-full px-10 text-lg text-left bg-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
          ></input>
        </div>
      </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 rounded-2xl text-white md:text-3xl md:px-20 px-10 py-2 leading- w-full right-0 bottom-0  mr-8"
        >
          Search
        </button>
        {
          data &&
          <Link to={`/customer/${QrCode}`}>
          <div className="mb-7 border-gray-600 border-b-2 mt-10 opacity-50"></div>
        <div className="mt-2 w-full bg-gray-500 rounded-xl hover:bg-yellow-50">
          <div className="flex justify-around px-1 py-2">
            <h1 className="text-xs xl:text-base">
              {data.name}
            </h1>
            <h1 className="text-xs xl:text-base">
              {data.bike_name}
            </h1>
            <h1 className="text-xs xl:text-base">
              {data.email}
            </h1>
          </div>
        </div>
          </Link>
        }     

    </div>
    </MainLayout>
  );
};

export default Search;

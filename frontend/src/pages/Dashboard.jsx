import React, { useState, useMemo } from "react";
import axios from "axios";
import { urlServer } from "../config";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import ReactTable, { useTable } from "react-table";
import Table from "../components/table";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../store/action";
import Modals from '../components/AddNewModal'
import AdminLayout from '../layout/AdminLayout'
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [modals, triggerModals] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [selectedFilter,setSelectedFilter] = useState('name')


  const _data = useSelector((state) => state.bikeData);
  const dispatch = useDispatch();
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Bike Name",
        accessor: "bike_name",
      },
      {
        Header: "Phone Number",
        accessor: "no_handphone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: 'Qr Code Number',
        accessor: 'qr_code'
      },
      {
        Header: "Last Service",
        accessor: "tanggal",
        Cell: ({ cell: { value } }) => value.toDateString(),
        sortType: "datetime"

      },
    ],
    []
  );

  const handleChangeValue = (e) =>{
    setSelectedFilter(e.target.value)
  }

  const handleFilter = (e)=> {
    const key = e.target.value
    const targetKey = selectedFilter
    let filtered = _data.bikeData.filter(e => e[targetKey].startsWith(key) )
    setCustomerData(filtered)
  }

  const clearSession = () =>{
    removeCookie('token')
  }
 

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    console.log(_data)
    setCustomerData(_data.bikeData);
  }, [_data]);

  


  return (
      <AdminLayout>
        <div className="absolute top-0 right-0 md:mr-28 mt-20">
          <button onClick={()=> clearSession()} className="bg-gray-600 text-white px-2  py-2 rounded-md"><span className="mr-1 bg-gray-600 opacity-20 p-2 relative">X</span> Logout</button>
        </div>
        {
        <div className="bg-white flex justify-center mx-6 md:mx-28 py-10 rounded-3xl shadow-sm flex-col items-center">
          <div className="flex justify-start w-full px-20 mb-10">
            <Link to="/add-new-bike">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded-3xl"
              >
              Add New
            </button>
              </Link>
            <div className="ml-auto"></div>
            <input
              placeholder="Search"
              onChange={handleFilter}
              className="ml-3 px-6 border placeholder-gray-600 border-gray-500 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></input>
            <div>
              <select
              value={selectedFilter}
              onChange={handleChangeValue}
                className="ml-2 block w-full py-2 px-4 border border-gray-500 bg-white rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-blue-500"
              >
                <option value="name">Name</option>
                <option value="no_handphone">Phone Number</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>         
          
         {customerData &&
          <Table columns={columns} data={customerData} />}
        </div>
        }
      {modals && (
        <Modals triggerModals={triggerModals}/>
      )}
     </AdminLayout>
  );
};

export default Dashboard;

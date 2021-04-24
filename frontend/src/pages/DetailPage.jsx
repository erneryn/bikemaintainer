import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlServer } from "../config";
import { useCookies } from "react-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Detailheader from '../components/DetailHeader';
import DetailService from '../components/DetailService';
import ServiceModal from '../components/ServiceModal'
import AdminLayout from '../layout/AdminLayout'
import BikeSpecs from '../components/BikeSpecs';

const DetailPage = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [serviceData, setServiceData] = useState([]);
  const [modals,triggerModals] = useState(false)
  const { id } = useParams();

  const FetchData = () => {
    axios
      .post(
        urlServer + "/service/get",
        {
          bike_id: id,
        },
        {
          headers: {
            token: cookies.token,
          },
        }
      )
      .then((resp) => {
        setServiceData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    FetchData();
  }, []);
  
  return (
    <AdminLayout>
        <Detailheader serviceData={serviceData} FetchData={FetchData}/>
        <BikeSpecs serviceData={serviceData} FetchData={FetchData}/>
        <div className="flex flex-row-reverse mx-16 xl:mx-48 mt-10 mb-5">
          <button onClick={()=> triggerModals(!modals)} className="bg-blue-500 text-white py-2 px-3 rounded-lg text-base">Add New Service Data</button>
        </div>
         <DetailService historyService={serviceData.history} FetchData={FetchData}/>
      <Link to="/dashboard">
      <button 
      className="bg-gray-700 text-white fixed bottom-6 ml-3">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.705 16.59L11.125 12L15.705 7.41L14.295 6L8.295 12L14.295 18L15.705 16.59Z" fill="#FEFEFD"/>
      </svg>
      </button>
    </Link>
      {
        modals && (<ServiceModal triggerModals={triggerModals} FetchData={FetchData} type="Add" data={null}/>)
      }
      </AdminLayout>
  );
};

export default DetailPage;

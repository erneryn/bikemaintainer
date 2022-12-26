import axios from "axios";
import { urlServer } from "../config";
import { useCookies } from "react-cookie";
import DialogDelete from "./DialogDelete";
import { useState } from "react";
import ServiceModal from './ServiceModal'
import { DateTime } from 'luxon'

export default function DetailService({ historyService,FetchData }) {
  const [cookies] = useCookies(["token"]);
  const [confirm, setConfirm] = useState(false);
  const [editModals,showEditModals] = useState(false)
  const [dataSelected,setDataSelected] = useState([])

  const GenerateDate = (_Date) => {
    let dt = DateTime.fromISO(_Date.split(' ')[0]).toISODate()
    console.log(dt)
    return dt
  };

  const List = (list) => {
    let data = JSON.parse(list);
    return data.map((e, idx) => <li key={idx + e}>{e}</li>);
  };

  const deleteService = (e) => {
    let id = e;
    axios.post(
      urlServer + "/service/delete",
      { id },
      {
        headers: {
          token: cookies.token,
        },
      }
    ).then(resp=>{
      setConfirm(false)
      FetchData()
    }).catch(err=>{
      alert('err')
    });
  };

  const closeDialog = () => {
    setConfirm(false);
  };

  const handleModals = (e)=>{
    setDataSelected(e)
    showEditModals(true)
  }

  return (
    <div>
      {
        editModals && <ServiceModal type="Edit" triggerModals={showEditModals} FetchData={FetchData} data={dataSelected}/>
      }
      {historyService &&
        historyService.map((e, idx) => {
          return (
            <div
              className="flex flex-col justify-center mx-16 xl:mx-36 my-5"
              key={idx}
            >
              <div className="bg-white mx-12 py-10 px-20 rounded-xl">
                <h5 className="text-gray-600 opacity-50 text-xl">
                  {GenerateDate(e.created)}
                </h5>
                <div className="border-gray-600 opacity-30 border-b-2 h-1 my-2"></div>
                <div className="flex  justify-around">
                  <div className="w-6/12">
                    <div>
                      <h2 className="text-lg text-gray-600 opacity-50">
                        Part Changed :
                      </h2>
                    </div>
                    <div>
                      <ul className="ml-10 list-disc">
                        {e.part_change !== "" && List(e.part_change)}
                      </ul>
                    </div>
                  </div>
                  <div className=" w-6/12">
                    <div>
                      <h2 className="text-lg text-gray-600 opacity-50">
                        Action :
                      </h2>
                    </div>
                    <div>
                      <ul className="ml-10 list-disc">
                        {e.action != "" && List(e.action)}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h2 className="text-lg text-gray-600 opacity-50">Notes :</h2>
                  <h5>{e.notes != "" && e.notes}</h5>
                </div>
                <div className="flex justify-end">
                  <button className="bg-gray-600 text-white px-3 py-2 rounded-xl flex"
                  onClick={()=> handleModals(e)}>
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
                  <button
                    onClick={() => setConfirm(true)}
                    className="bg-red-400 text-white py-2 px-2 rounded-xl ml-2 opacity-80"
                  >
                    Delete
                  </button>
                  <DialogDelete
                    confirm={confirm}
                    closeDialog={closeDialog}
                    title="Are you sure to delete this data ?"
                    desc="deleting this will permanently remove data from databases"
                    deleteData={()=> deleteService(e.id)}
                  />
                 
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

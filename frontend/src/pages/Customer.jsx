import AdminLayout from "../layout/AdminLayout";
import BikeSpecs from "../components/BikeSpecs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { urlServer } from "../config";

const Customer = () => {
  const { qr_code } = useParams();
  const [bikeData, setBikeData] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    Axios.post(urlServer + "/service/get/", {
      qr_code,
    })
      .then((resp) => {
        setBikeData(resp.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const List = (list) => {
    let data = JSON.parse(list);
    return data.map((e, idx) => (
      <li key={idx + e} className="text-xs xl:text-lg">
        {e}
      </li>
    ));
  };

  const GenerateDate = (_Date) => {
    let fullDate = new Date(_Date);
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
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if (bikeData.history) {
      if (bikeData.history.length !== 0) {
        let date = bikeData.history[0].created;
        let formated = GenerateDate(date);
        setDate(formated);
      }
    }
  }, [bikeData]);

  const FloatingButton = () => {
    return (
      <div className="fixed top-3/4 ml-2 bg-yellow-500 p-2 rounded-xl z-50">
        <div>
          <svg
            className="w-7 xl:w-10"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.5 0C10.0755 0 0 10.0755 0 22.5C0 34.9245 10.0755 45 22.5 45C34.9245 45 45 34.9245 45 22.5C45 10.0755 34.9245 0 22.5 0ZM22.9769 35.6002C22.9765 35.6002 22.9772 35.6002 22.9769 35.6002H22.9714C20.7175 35.5991 18.5027 35.034 16.5358 33.9615L9.39709 35.8336L11.3077 28.8573C10.1291 26.8159 9.50901 24.4999 9.51004 22.1272C9.51313 14.7045 15.5542 8.66581 22.9769 8.66581C26.579 8.66718 29.9604 10.0693 32.5027 12.6137C35.0454 15.1584 36.4447 18.5408 36.4434 22.1378C36.4403 29.5608 30.3985 35.6002 22.9769 35.6002Z"
              fill="white"
            />
            <path
              d="M22.9813 10.9397C16.8074 10.9397 11.7863 15.9587 11.7835 22.1282C11.7828 24.2424 12.3747 26.3013 13.495 28.0828L13.761 28.5061L12.6301 32.6353L16.8664 31.5243L17.2753 31.7667C18.9936 32.7864 20.9636 33.3257 22.9721 33.3264H22.9765C29.1457 33.3264 34.1668 28.307 34.1695 22.1372C34.1706 19.1472 33.0074 16.336 30.8942 14.2212C28.7811 12.1063 25.9706 10.9407 22.9813 10.9397ZM29.5649 26.9389C29.2844 27.7244 27.9403 28.4416 27.2938 28.5384C26.7139 28.6249 25.9806 28.661 25.1745 28.4052C24.6856 28.25 24.059 28.043 23.256 27.6966C19.8808 26.2395 17.6763 22.842 17.5081 22.6175C17.3398 22.3929 16.1341 20.7934 16.1341 19.1376C16.1341 17.4821 17.0034 16.668 17.3117 16.3316C17.6203 15.9948 17.9849 15.9107 18.2091 15.9107C18.4333 15.9107 18.6579 15.9127 18.8539 15.9223C19.0606 15.9326 19.338 15.8437 19.6109 16.4998C19.8914 17.1734 20.5643 18.8289 20.6484 18.9971C20.7326 19.1657 20.7885 19.3621 20.6766 19.5866C20.5643 19.8112 20.1915 20.2956 19.8355 20.7371C19.6861 20.9221 19.4914 21.0869 19.6878 21.4237C19.8839 21.7602 20.5595 22.8619 21.5596 23.7539C22.845 24.8999 23.9292 25.2549 24.2657 25.4235C24.6018 25.5917 24.7982 25.5635 24.9946 25.3393C25.1906 25.1148 25.8357 24.3571 26.0599 24.0203C26.2841 23.6835 26.5086 23.7398 26.8169 23.8521C27.1256 23.964 28.7797 24.778 29.1162 24.9462C29.4526 25.1148 29.6768 25.1989 29.7609 25.3393C29.8454 25.4798 29.8454 26.153 29.5649 26.9389Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="mt-5">
          <a href="https://www.instagram.com/rucciartcycles/" target="_blank">

          <svg
            className="w-7 xl:w-10"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
              d="M30.9999 5.5857C39.2773 5.5857 40.2577 5.6172 43.5265 5.76634C46.549 5.90429 48.1904 6.4093 49.2829 6.83372C50.7298 7.39608 51.7626 8.06796 52.8473 9.15269C53.932 10.2374 54.6039 11.2702 55.1662 12.7171C55.5907 13.8096 56.0957 15.451 56.2337 18.4733C56.3828 21.7423 56.4143 22.7227 56.4143 31.0001C56.4143 39.2775 56.3828 40.2578 56.2337 43.5267C56.0957 46.5491 55.5907 48.1906 55.1662 49.283C54.6039 50.7299 53.932 51.7627 52.8473 52.8474C51.7626 53.9322 50.7298 54.604 49.2829 55.1663C48.1904 55.5908 46.549 56.0958 43.5265 56.2338C40.2582 56.3829 39.2778 56.4144 30.9999 56.4144C22.722 56.4144 21.7417 56.3829 18.4733 56.2338C15.4509 56.0958 13.8094 55.5908 12.7171 55.1663C11.2701 54.604 10.2373 53.9322 9.15256 52.8474C8.06784 51.7627 7.39596 50.7299 6.83372 49.283C6.40918 48.1906 5.90416 46.5491 5.76622 43.5268C5.61708 40.2578 5.58558 39.2775 5.58558 31.0001C5.58558 22.7227 5.61708 21.7423 5.76622 18.4735C5.90416 15.451 6.40918 13.8096 6.83372 12.7171C7.39596 11.2702 8.06784 10.2374 9.15256 9.15269C10.2373 8.06796 11.2701 7.39608 12.7171 6.83372C13.8094 6.4093 15.4509 5.90429 18.4732 5.76634C21.7422 5.6172 22.7225 5.5857 30.9999 5.5857ZM30.9999 0C22.5808 0 21.5252 0.0356859 18.2187 0.186551C14.919 0.33717 12.6657 0.861137 10.6937 1.62752C8.65518 2.41975 6.92638 3.47974 5.203 5.20312C3.47962 6.9265 2.41962 8.6553 1.6274 10.6938C0.861014 12.6658 0.337047 14.9192 0.186428 18.2189C0.0355628 21.5252 0 22.5809 0 31.0001C0 39.4192 0.0355628 40.4749 0.186428 43.7813C0.337047 47.081 0.861014 49.3343 1.6274 51.3063C2.41962 53.3447 3.47962 55.0736 5.203 56.797C6.92638 58.5204 8.65518 59.5804 10.6937 60.3726C12.6657 61.139 14.919 61.663 18.2187 61.8136C21.5252 61.9644 22.5808 62 30.9999 62C39.4191 62 40.4748 61.9644 43.7811 61.8136C47.0808 61.663 49.3342 61.139 51.3062 60.3726C53.3447 59.5804 55.0735 58.5204 56.7969 56.797C58.5203 55.0736 59.5803 53.3448 60.3725 51.3063C61.1389 49.3343 61.6628 47.081 61.8134 43.7813C61.9643 40.4749 62 39.4192 62 31.0001C62 22.5809 61.9643 21.5252 61.8134 18.2189C61.6628 14.9192 61.1389 12.6658 60.3725 10.6938C59.5803 8.6553 58.5203 6.9265 56.7969 5.20312C55.0735 3.47974 53.3447 2.41975 51.3062 1.62752C49.3342 0.861137 47.0808 0.33717 43.7811 0.186551C40.4748 0.0356859 39.4191 0 30.9999 0ZM30.9999 15.0811C22.2082 15.0811 15.081 22.2083 15.081 31.0001C15.081 39.7918 22.2082 46.919 30.9999 46.919C39.7917 46.919 46.9189 39.7918 46.9189 31.0001C46.9189 22.2083 39.7917 15.0811 30.9999 15.0811ZM30.9999 41.3335C25.293 41.3335 20.6665 36.707 20.6665 31.0001C20.6665 25.2932 25.293 20.6667 30.9999 20.6667C36.7068 20.6667 41.3333 25.2932 41.3333 31.0001C41.3333 36.707 36.7068 41.3335 30.9999 41.3335ZM51.2678 14.4522C51.2678 16.5067 49.6024 18.1722 47.5478 18.1722C45.4933 18.1722 43.8278 16.5067 43.8278 14.4522C43.8278 12.3976 45.4933 10.7322 47.5478 10.7322C49.6024 10.7322 51.2678 12.3976 51.2678 14.4522Z"
              fill="white"
              />
          </svg>
              </a>
        </div>
      </div>
    );
  };
  return (
    <AdminLayout>
      <FloatingButton />
      <div className="flex flex-col md:flex-row justify-end mx-12 md:mx-36">
        <img
          src={bikeData.image_url ? bikeData.image_url : "/images/no_image.png"}
          alt="bike image"
          className="rounded-3xl h-48 xl:h-72 shadow-2xl object-cover relative z-10"
        />
        <div className="md:w-8/12 flex flex-col justify-center relative">
          <div className="bg-white h-56 rounded-3xl -mt-10 xl:mt-0  md:static md:rounded-l-none p-6">
            <div className="mt-10 xl:mt-0   border-gray-200 border-b-2 pb-3 flex items-baseline justify-between">
              <div>
                <h1 className="text-2xl xl:text-3xl text-gray-600">
                  {bikeData.name}
                </h1>
                <h3 className="text-sm text-gray-600 opacity-50">
                  {bikeData.bike_name}
                </h3>
              </div>
            </div>
            <div className="mt-4 flex justify-between xl:justify-betwee">
              <div>
                <h2>Email</h2>
                <h3 className="text-sm text-gray-600 opacity-50">
                  {bikeData.email}
                </h3>
              </div>
              <div className="xl:mr-5">
                <h2 className="xl:text-xl">Last Service</h2>
                <h3 className="text-sm xl:text-2xl text-gray-600 opacity-50">
                  {date}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <BikeSpecs serviceData={bikeData}/>
      </div>
      <div className="text-center mt-5">
        <h1 className="text-2xl">SERVICE HISTORY</h1>
      </div>
      {bikeData.history &&
        bikeData.history.map((e, idx) => {
          return (
            <div
              className="flex flex-col justify-center mx-12 xl:mx-36 my-2"
              key={idx}
            >
              <div className="bg-white rounded-3xl p-5">
                <h5 className="text-gray-600 opacity-50 xl:text-xl text-center xl:text-left">
                  {GenerateDate(e.created)}
                </h5>
                <div className="border-gray-600 opacity-30 border-b-2 h-1 my-2"></div>

                <div className="xl:hidden">
                  <div className="flex">
                    <div className="w-4/12  pt-2">
                      <h5 className="text-xs text-gray-600 opacity-50">
                        Part Changed :
                      </h5>
                    </div>
                    <div className="w-8/12 pl-4 pt-2">
                      <ul className="list-disc text-left">
                        {e.part_change != "" && List(e.part_change)}
                      </ul>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="w-4/12  pt-2">
                      <h5 className="text-xs text-gray-600 opacity-50">
                        Action :
                      </h5>
                    </div>
                    <div className="w-8/12 pl-4 pt-2">
                      <ul className="list-disc text-left">
                        {e.action != "" && List(e.action)}
                      </ul>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="w-4/12  pt-2">
                      <h5 className="text-xs text-gray-600 opacity-50">
                        Notes :
                      </h5>
                    </div>
                    <div className="w-8/12 pl-4 pt-2">
                      <ul className="list-disc text-left">
                        <h5 className="text-xs">{e.notes}</h5>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden xl:block">
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className=" w-6/12 pl-4">
                        <h1 className="text-gray-600 opacity-50">
                          Part Changes :
                        </h1>
                        <ul className="list-disc text-left ml-10">
                          {e.part_change != "" && List(e.part_change)}
                        </ul>
                      </div>
                      <div className=" w-6/12 pl-4">
                        <h1 className="text-gray-600 opacity-50">Action :</h1>
                        <ul className="list-disc text-left ml-10">
                          {e.action != "" && List(e.action)}
                        </ul>
                      </div>
                    </div>
                    <div className=" pl-4 ">
                      <h1 className="text-gray-600 opacity-50">Notes: </h1>
                      <h1 className="ml-5">{e.notes}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </AdminLayout>
  );
};

export default Customer;

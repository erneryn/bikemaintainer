import { Link } from "react-router-dom";

const LandingContent = () => {
  return (
    <div className="flex relative min-h-full">
      <Link to="/search">
        <div className="md:hidden bg-gray-100 shadow-lg w-2/4 text-center rounded-lg p-1 absolute right-0 top-0  mr-10 mt-16">
          Customer
        </div>
      </Link>
      <Link to="/Login">
        <div className="md:hidden bg-gray-100 w-2/4 shadow-lg text-center rounded-lg p-1 absolute left-0 bottom-0  ml-10 pr-8 mb-16">
          Admin
        </div>
      </Link>
      <div className="relative mr-4">
        <Link to="/search">
          <div className="hover:opacity-100 opacity-0 transition-all duration-1000">
            <div className=" absolute  bg-gray-800 inset-0 opacity-75 w-60 rounded-3xl "></div>
            <div className=" absolute inset-0 flex justify-center items-center">
              <button className="bg-red-600 py-1 px-4 rounded-xl text-gray-100 text-2xl">
                Customer
              </button>
            </div>
          </div>
          <img src="images/rucci_1.png" className="customer w-60 rounded-3xl" />
        </Link>
      </div>
      <div className="relative mt-32 md:mt-0 ml-4 ">
        <Link to="/login">
          <div className="hover:opacity-100 opacity-0 transition-all duration-1000">
            <div className=" absolute  bg-gray-800 inset-0 opacity-75 w-60 rounded-3xl "></div>
            <div className=" absolute inset-0 flex justify-center items-center">
              <button className="bg-yellow-400 py-1 px-4 rounded-xl text-gray-100 text-2xl">
                Admin
              </button>
            </div>
          </div>
          <img
            src="images/rucci_2.png"
            className="w-60 min-h-full rounded-3xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default LandingContent;

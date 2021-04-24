import Header from "../components/Header";
import Footer from "../components/Footer";

const mainlayout = ({ children }) => {
  return (
    <div className="bg-gray-400 min-h-screen relative">
      <div className="justify-center items-center flex p-4">
        <div className="h-36 relative w-32 flex items-center justify-center">
          <Header />
        </div>
      </div>
      <div className="minimum-height">{children}</div>
      <div className="flex justify-center w-full mt-7 pb-7">
        <Footer />
      </div>
    </div>
  );
};

export default mainlayout;

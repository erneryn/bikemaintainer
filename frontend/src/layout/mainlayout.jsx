import Header from '../components/Header';
import Footer from '../components/Footer';

const mainlayout = ({children})=>{
    return(
        <div className="fixed bg-gray-400 inset-0 md:px-36 md:py-12 px-10 py-12">
          <div className="bg-gray-400 relative min-h-full flex items-center justify-center">
                <Header/>
                {
                    children
                }
                <div className="absolute bottom-0 right-0">
                <Footer/>
                </div>
              </div>
              </div>
    )
}

export default mainlayout
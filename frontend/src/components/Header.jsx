import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center md:justify-start">
      <Link to="/">
      <img
        src="/images/rucci_3.png"
        className="w-20 h-20 md:w-32 md:h-32 rounded-full relative object-cover object-top "
        alt=""
        />
        </Link>
    </div>
  );
};

export default Header;

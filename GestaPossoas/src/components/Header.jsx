import { Link } from 'react-router-dom';
import { FaHome, FaPhone, FaSignInAlt, FaUserPlus, FaUserCircle, FaUsers, FaTachometerAlt} from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import '../App.css'

function Header(){
  const { user, token} = useAuth();

  return (

    <header className="flex items-center justify-between w-full h-30 bg-blue-300 px-4">
      <h1 className="text-6xl text-blue-50 font-bold text-shadow-blue-600">GestPeople</h1>
      <nav className="w-2/5">
        <ul className="w-full h-full flex items-center justify-evenly">
          <li><Link to="/" className="flex flex-col items-center"><FaHome />HOME</Link></li>
          <li>{token ? 
          (<Link to="/dashboard" className='flex flex-col items-center text-lg'> <FaTachometerAlt /> <span>DashBoard</span> </Link>)
           : 
          (<a href="#footer" className='flex flex-col items-center text-lg'><FaPhone />SUPPORT</a>)
          }</li>
          <li>{token ? 
          (<Link to="/lista" className='flex flex-col items-center text-lg'> <FaUsers /> <span>Funcionários</span> </Link>)
           : 
          (<Link to="/cadastro" className='flex flex-col items-center text-lg'><FaUserPlus />SIGN UP</Link>)
          }</li>
          <li>{token ? 
          (<Link to="/profile" className='flex flex-col items-center text-lg'> <FaUserCircle /> <span>Perfil</span> </Link>)
           : 
          (<Link to="/login" className='flex flex-col items-center text-lg'><FaSignInAlt />LOGIN</Link>)
          }</li>
        </ul>
      </nav>
    </header>

  );
}

export default Header
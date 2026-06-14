import { Link } from 'react-router-dom';
import { FaHome, FaPhone, FaSignInAlt, FaUserCircle, FaUsers, FaTachometerAlt, FaBuilding, FaTasks, FaUserTie, FaBullseye, FaTools, FaMoneyBill} from "react-icons/fa";
import '../App.css'
import { FaMessage } from 'react-icons/fa6';

function Header(){
  const token = localStorage.getItem('token');

  function nav(){

    let button = document.querySelector('#btn-response');
    let nav = document.querySelector('#menu');
    button.addEventListener('click', () => {
    nav.classList.toggle('ativo');

    if (nav.classList.contains('ativo')){

        button.innerHTML = '&#10006';
    }else{
        
        button.innerHTML = '&#9776';
    }
    
});
  }

  return (

    <header className="flex items-center justify-between w-full h-40 bg-blue-300 px-4">
      <h1 className="text-7xl text-blue-50 font-bold text-shadow-blue-600">GestPeople</h1>
      <nav className="w-2/5">
        {token ? (
          <div className="w-full h-full flex flex-col p-4">

            <button id="btn-response" onClick={nav}>&#9776;</button>

            <div id="menu">

              <ul className="w-full h-full flex items-center justify-evenly">
                <li><Link to="/" className="flex flex-col items-center text-2xl"><FaHome />HOME</Link></li>
                <li><Link to="/dashboard" className='flex flex-col items-center text-2xl'> <FaTachometerAlt /> <span>DashBoard</span> </Link></li>
                <li><Link to="/lista" className='flex flex-col items-center text-2xl'> <FaUsers /> <span>Funcionários</span> </Link></li>
                <li><Link to="/profile" className='flex flex-col items-center text-2xl'> <FaUserCircle /> <span>Perfil</span> </Link></li>
              </ul>

              <ul className="w-full h-full flex items-center justify-evenly">
                <li><Link to="/departamentos" className="flex flex-col items-center text-2xl"><FaBuilding />Departamentos</Link></li>
                <li><Link to="/desempenhos" className='flex flex-col items-center text-2xl'> <FaTasks /> <span>Desempenho</span> </Link></li>
                <li><Link to="/funcoes" className='flex flex-col items-center text-2xl'> <FaUserTie /> <span>Funções</span> </Link></li>
              </ul>

              <ul className="w-full h-full flex items-center justify-evenly">
                <li><Link to="/presencas" className="flex flex-col items-center text-2xl"><FaBullseye />Presenças</Link></li>
                <li><Link to="/salario" className='flex flex-col items-center text-2xl'> <FaMoneyBill /> <span>Salários</span> </Link></li>
                <li><Link to="/messeges" className='flex flex-col items-center text-2xl'> <FaMessage /> <span>Mensagens</span> </Link></li>
                <li><Link to="/definicoes" className='flex flex-col items-center text-2xl'> <FaTools /> Definições </Link></li>
              </ul>

            </div>
          </div>
          
        ) : (
          <ul className="w-full h-full flex items-center justify-evenly">
            <li><a href="#footer" className='flex flex-col items-center text-2xl'><FaPhone />SUPPORT</a></li>
            <li><Link to="/login" className='flex flex-col items-center text-2xl'><FaSignInAlt />LOGIN</Link></li>
          </ul>
        )}
      </nav>
    </header>

  );
}

export default Header
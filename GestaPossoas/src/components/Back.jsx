import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import '../App.css'

export default function Back(props){
    const { user } = useAuth();

    return (
        <div className="w-full h-30 bg-white flex items-center justify-between px-8 border mb-8 z-10">
            <Link to={props.back}><FaArrowLeft />Voltar</Link>

            <div className="flex flex-col items-center w-4/10 item-center justify-center">
                {user && user.image ?
                (<div className="w-25 h-20 rounded-full overflow-hidden border-2 border-gray-300">
                    <img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                </div>) 
                : user ? 
                (<FaUser className="text-blue-500 text-4xl mr-4" />) : ""}
                {user ? (<div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {user?.first_name} {user?.last_name || ''}
                    </h2>
                </div>) : ""}
            </div>

        </div>
    );
}
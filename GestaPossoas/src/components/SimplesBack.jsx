import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import '../App.css'

export default function SimplesBack(props){
    return (
        <div className="absolute bg-white flex items-center py-4 px-8 border-b border-t mr-195 mb-100 rounded-lg z-10">
            <Link to={props.back}><FaArrowLeft />Voltar</Link>
        </div>
    );
}
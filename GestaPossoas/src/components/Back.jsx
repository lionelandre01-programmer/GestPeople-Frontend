import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import '../App.css'

export default function Back(){
    return (
        <div className="w-full h-30 bg-white flex items-center px-8 border mb-8 z-10">
            <Link to="/"><FaArrowLeft />Voltar</Link>
        </div>
    );
}
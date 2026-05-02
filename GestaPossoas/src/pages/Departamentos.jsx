import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import { FaBuilding, FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import '../App.css'
import Footer from "../components/Footer";

export default function Departamentos(){

    const [departamentos, setDepartamentos] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchDep = async() => {

            try{

                const response = await api.get('/departamento/get');
                setDepartamentos(response.data);

            } catch(error){

                console.log("Erro ao buscar os departamentos: " ,error.response.data);
            
            }finally{

                setLoading(false);
            } 
        }

        fetchDep();

    }, []);

    const naviga = (id) => {
        navigate(`/eachDep/${id}`);
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header />
            <main style={{padding: "6rem 0"}}>

                <HeadTitle text="Departamentos"/>

                <Link className="border rounded-lg p-4 absolute top-34 right-8 hover:bg-blue-400 transition duration-900" to="/departamento/cadastro">
                <FaPlus />Add Departamento
                </Link>
                
                {departamentos.map((dep) => (

                    <article key={dep.id} className="w-3/10 h-52 border rounded-lg p-4 flex flex-col items-center justify-evenly bg-blue-100">

                        <div className="w-full h-1/3 flex items-center justify-center">
                            <FaBuilding className="text-3xl text-blue-500"/>
                        </div>

                        <div className="w-full h-auto flex items-center justify-center text-center mb-2">
                            <h2 className="text-blue-700 font-black">Departamento {dep.denominacao}</h2>
                        </div>

                        <div className="w-full h-1/2 text-center">
                            <p>{dep.responsabilidade}</p>
                        </div>

                        <div className="w-full h-1/3 flex items-center justify-evenly">
                            <button onClick={() => naviga(dep.id)} className="border rounded-lg py-2 px-3 bg-blue-400"><FaEye /> Ver</button>
                            <button className="border rounded-lg py-2 px-3 bg-yellow-400"><FaEdit /> Editar</button>
                            <button className="border rounded-lg py-2 px-3 bg-red-500"><FaTrash /> Eliminar</button>
                        </div>

                    </article>
                ))}

            </main>
            <Footer />
        </>
    );

}
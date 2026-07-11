import api from '../api';
import '../app.css';
import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import { Link, useNavigate } from 'react-router-dom';

export default function Employees(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navega = useNavigate();

    useEffect(() => {

        async function fetchEmployees(){

            try{
                
                const response = await api.get('/user/employees');
                setEmployees(response.data);
                console.log(response.data);

            }catch(error){

                console.log("Erro ao pegar os funcionário: ",error.response.data);

            }finally{

                setLoading(false);

            }

        }

        fetchEmployees();

    }, []);

    if (loading) return <Loading />;

    const navegar = (id) => {
        navega(`/employees/details/${id}`);
    }

    return (
        <>
            <Header />
            <main style={{padding: "6rem 0"}} >
                <HeadTitle text="Funcionários Por Departamento"/>
                <div className="w-full h-auto flex items-center justify-center gap-10 overflow-x-scroll px-5">

                    {employees.map((emp, index) => (

                        <article key={index} className="border border-gray-500 rounded-lg w-4/10 h-auto p-3 bg-[#61d4da] shrink-0">
                            <h1 className="text-center text-4xl font-black font-mono mb-10">Departamento: {emp.dep}</h1>
                            <span className="text-2xl text-blue-500 font-bold">Funcionários</span>
                            <ul className="pl-10 text-2xl font-sans mt-5">
                                {emp.users.map(us => (

                                    <li key={us.id} onClick={() => navegar(us.id)}>
                                        <Link className='flex'>{us.first_name} {us.last_name}
                                        <div className="flex-grow flex justify-evenly">{Array.from({ length: 6 }).map((_,i) => (<span key={i}>.</span>))}</div>
                                        <span className="text-blue-600 font-bold flex-1">Função: {us.funcao.denominacao}</span></Link>
                                    </li>

                                ))

                                }
                            </ul>
                        </article>

                    ))

                    }

                </div>
            </main>
        </>
    );

}
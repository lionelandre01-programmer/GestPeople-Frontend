import { useEffect, useState } from "react";
import api from "../api";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import FormatarMoeda from "../components/FormatarMoeda";
import HeadTitle from "../components/HeadTitle";

export default function Salario(){
    const [salarios, setSalarios] = useState('');
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();

    useEffect(() => {

        const fetchSalarios = async () => {

            try{

                const [salario, user] = await Promise.all([
                    api.get('/salary'),
                    api.get('/user/all')
                ]);

                setSalarios(salario.data);
                setUsers(user.data);

            }catch(error){

                console.log("Erro ao trazer os salários: ",error.response.data);

            }finally{

                setLoading(false);

            }

        }

        fetchSalarios();

    }, []);

    if (loading) return <Loading />;

    const naviga = (id) => {
        navegate(`/salario/pagamento/${id}`);
    }

    return (
        <>
            <Header />
            <main style={{padding: "6rem 0"}} className="bg-blue-100">

                <HeadTitle text="Salários e acréscemos" />

                <Link className="border rounded-lg p-4 absolute top-50 right-8 hover:bg-blue-400 transition duration-900" to="/salario/create">
                    <FaPlus />Add Salário
                </Link>

                <div className="w-[25%] h-[50vh] border-r-2 overflow-y-scroll">

                    {users.map(user => (
                        <button key={user.id} className="py-1 text-center font-bold font-mono border-2 px-20 rounded-lg shrink-0 mb-2 text-xl" 
                        onClick={() => naviga(user.id)}> {user.first_name} {user.last_name} </button>
                    ))

                    }

                </div>

                <div className="w-7/10 h-[50vh] flex flex-col items-center overflow-y-scroll gap-5">

                    {salarios.map(salario => (

                    <div key={salario.id} className="w-8/10 h-auto border border-blue-300 rounded-lg p-2 font-mono gap-2 flex flex-wrap font-black bg-green-200 shrink-0 text-xl">
                        <h2 className="w-full text-center font-bold text-cyan-500 border-b border-b-blue-600">Processamento De Salários</h2>
                        <h3 className="w-full text-center border border-green-700 rounded-lg">Salário Base <br /> 
                            <span className="text-red-600"><FormatarMoeda valor={Number(salario.salario)}/></span>
                        </h3>
                        <h3 className="w-[49%] text-center border-b border-green-700">Subsídio De Transporte <br /> <span className="text-blue-500">{salario.transporte}%</span></h3>
                        <h3 className="w-[49%] text-center border-b border-green-700">Subsídio De Alimentação <br /> <span className="text-blue-500">{salario.alimentacao}%</span></h3>
                        <h3 className="w-[49%] text-center border-b border-green-700">Subsídio De Desempenho <br /> <span className="text-blue-500">{salario.desempenho}%</span></h3>
                        <h3 className="w-[49%] text-center border-b border-green-700">Subsídio De Presenças <br /> <span className="text-blue-500">{salario.presenca}%</span></h3>

                        <h3 className="w-full text-center border border-green-600 bg-green-300 rounded-lg">Salário Processado <br /> <span className="text-green-700"><FormatarMoeda valor={((
                        ((salario.transporte + salario.alimentacao + salario.desempenho + salario.presenca) / 100) * salario.salario
                        ) + parseInt(salario.salario))} /></span></h3>
                    </div>

                    ))

                    }

                </div>

            </main>
        </>
    );

}
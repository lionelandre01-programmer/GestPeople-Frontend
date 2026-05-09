import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FaUser, FaPlus, FaMinus, FaTasks } from "react-icons/fa";
import '../App.css'
import api from "../api";
import HeadTitle from "../components/HeadTitle";

export default function Desempenho(props){
    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDesempenho = async() => {

            try{

                const response = await api.get("/desempenho");
                setUsers(response.data);

            }catch(error){

                console.log("Erro ao visualizar o desempenho: ",error.response.data);

            }finally{

                setLoading(false);
            }
        }

        fetchDesempenho();

    }, [props.reload]);

    if (loading) return <Loading />;

    function getDados(id, action){

        const dados = {
            user_id: id,
            action: action
        }

        props.onSubmit(dados);

    }

    return (
        <>
        <Header />

        <main style={{padding: "5rem 0"}}>

            <HeadTitle text="Desempenho De Funcionários"/>

            {users.map((user) => (

                <article key={user.id} className="flex flex-col items-center justify-evenly w-4/10 h-1/2 border rounded-lg p-4">
                    <div className="w-full h-4/10 flex items-center justify-evenly">
                        <div className="w-3/10 h-35 border border-blue-600 rounded-full overflow-hidden text-center">
                            {user.image ? 
                            (<img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>) 
                            : 
                            (<FaUser className="text-blue-500 text-8xl mt-3" />)}
                        </div>

                        <div className="w-7/10 h-full pl-2 text-blue-700 font-bold">
                            <h3>Nome: <span className="text-black font-normal">{user.first_name} {user.last_name}</span> </h3>
                            <h3>Departamento: <span className="text-black font-normal">{user.departamento.denominacao}</span></h3>
                            <h3>Função: <span className="text-black font-normal">{user.funcao.denominacao}</span></h3>
                            <h3>Contratado em: <span className="text-black font-normal">{format(new Date(user.created_at), "dd/MM/yyyy HH:mm", { locale: pt })}</span></h3>
                            <h3>Situação: {user.ult_suspensao ? 
                            (<>
                            {user.ult_suspensao.efectivo && user.ult_suspensao.suspenso ? (<span className="text-amber-600 font-normal">Suspenso</span>) 
                            : user.ult_suspensao.efectivo && !user.ult_suspensao.suspenso ? (<span className="text-black font-normal">Efectivo</span>) 
                            : (<span className="text-red-600 font-normal">Demitido</span>)}
                            </>) : ("Processando...")}</h3>
                        </div>
                    </div>

                    <div className="w-full h-3/10 flex flex-col items-center justify-center mb-2 font-bold">
                        {user.ult_desempenho ? 
                        (<div className="w-full h-full flex-1 text-center">
                        <h2> <FaTasks/> Desempenho: {user.ult_desempenho.nivel}%</h2>
                        { user.ult_desempenho.nivel >= 90 ? (<progress value={user.ult_desempenho?.nivel} max="100" className="w-full" id="progressExcellent">
                            
                        </progress>) 
                        : user.ult_desempenho.nivel >= 70 && user.ult_desempenho.nivel < 90 ? (<progress value={user.ult_desempenho?.nivel} max="100" className="w-full" id="progressGood">
                            
                        </progress>) 
                        : user.ult_desempenho.nivel > 40 && user.ult_desempenho.nivel < 70 ? (<progress value={user.ult_desempenho?.nivel} max="100" className="w-full" id="progressNormal">
                            
                        </progress>) 
                        : (<progress value={user.ult_desempenho?.nivel} max="100" className="w-full" id="progressBad">
                            
                        </progress>)}
                        </div>)
                        :
                        (<div className="w-full h-full flex-1 text-center">
                        <h2> <FaTasks/> Desempenho</h2>
                        <h2 className="text-red-400">Ainda Sem Avaliação</h2>
                        </div>)}
                    </div>
                    
                    <div className="w-full h-3/12 flex items-center justify-evenly">
                        <button className="border rounded-lg py-2 px-15 bg-red-500" 
                        onClick={() => getDados(user.id, "-")}><FaMinus /></button>
                        <button className="border rounded-lg py-2 px-15 bg-blue-400" 
                        onClick={() => getDados(user.id, "+")}><FaPlus /></button>
                    </div>
                </article>

            ))

            }

        </main>

        <Footer />

        </>
    );

}
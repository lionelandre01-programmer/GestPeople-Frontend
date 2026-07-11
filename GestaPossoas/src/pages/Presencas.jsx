import '../app.css'
import { useEffect, useState } from 'react'
import api from '../api'
import Loading from '../components/Loading';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import { FaTasks, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link, useNavigate } from 'react-router-dom';

export default function Presencas(){

    const [users, setUsers] = useState('');
    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();

    useEffect(() => {

        const fetchPresencas = async() => {

            try{
                const response = await api.get('/presenca');
                setUsers(response.data.user);
                console.log(response.data.user);

            }catch(error){
                console.log('Erro ao pegar as presenças e faltas: ',error.response.data);

            }finally{
                setLoading(false);
            }

        }

        fetchPresencas();

    }, []);

    const inform = (id) => {
        navegate(`/presencas/information/${id}`);
    }

    if (loading) return <Loading />;

    return (
        <>
        <Header/>
        <main style={{padding: "8rem 0", alignItems: "stretch", minHeight: "50vh"}}>
            <HeadTitle text="Controle De Presenças"/>
            <Link className="border rounded-lg p-4 absolute top-50 right-8 hover:bg-blue-400 transition duration-900" to="/presencas/register">
                <FaTasks /> Registrar
            </Link>
            {users.map((user) => (
                <article key={user.id} className="w-4/10 min-h-16 flex flex-col border border-gray-400 rounded-lg p-4 text-xl ">
                    <div className="flex-1 w-full text-center text-blue-500">
                        <h2 className="font-bold">Departamento: {user.departamento.denominacao}</h2>
                        <h2 className="font-bold">Cargo: {user.funcao.denominacao}</h2>
                    </div>
                    
                    <div className="flex-2 w-full flex items-center justify-center px-4 py-2">
                        <div className="flex-1 h-7/10 flex items-center justify-center rounded-full overflow-hidden border-2 border-gray-300 text-center">
                            {user.image ? 
                            (<img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                            ) 
                            : 
                            (<FaUser className="text-blue-500 w-full h-full object-cover" />)}
                        </div>
                        <div className="flex-2 h-full flex flex-col items-start justify-center font-bold pl-4">

                            <p>Nome: <span className="text-gray-500">{user.first_name} {user.last_name}</span></p>
                            <p>Morada: <span className="text-gray-500">{user.morada}</span></p>
                            <p>Situação: {user.ult_suspensao ? 
                            (<>
                            {user.ult_suspensao.efectivo && user.ult_suspensao.suspenso ? (<span className="text-amber-600">Suspenso</span>) 
                            : user.ult_suspensao.efectivo && !user.ult_suspensao.suspenso ? (<span className="text-gray-500">Efectivo</span>) 
                            : (<span className="text-red-600">Demitido</span>)}
                            </>) : ("Processando...")}</p>
                            <p>Contratado em: <span className="text-gray-500">{ format(new Date(user.created_at), 'dd/MM/yyyy', { locale: pt }) }</span></p>

                        </div>
                    </div>
                    
                    <div className="flex-1 w-full text-center text-cyan-500">
                        <h2 className="font-bold text-2xl">Faltas e Presenças</h2>
                    </div>
                    
                    <div className="flex-4 flex w-full font-bold py-2">
                        <div className="flex-1 h-full">
                            <p>Presenças: <span>{user.presencas_total}</span></p>
                            <p>Faltas: <span>{user.faltas_total}</span></p>
                        </div>

                        <div className="flex-1 h-full">
                            <p>Justificadas: <span>{user.justificadas}</span></p>
                            <p>N/Justificadas: <span>{user.nao_justificadas}</span></p>
                        </div>
                    </div>
                    <div className="flex-1 w-full py-2 pr-1.5 text-end">
                        <button onClick={() => inform(user.id)} className="text-gray-500">
                            Mais Informações...
                        </button>
                    </div>
                </article>
            ))

            }
        </main>
        </>
    );

}
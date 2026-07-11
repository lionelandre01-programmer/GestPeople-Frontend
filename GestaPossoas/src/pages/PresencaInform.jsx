import '../app.css'
import api from '../api'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FaUser } from 'react-icons/fa';
import SimplesBack from '../components/SimplesBack';

export default function PresencaInform(){
    const [user, setUser] = useState('');
    const [faltas, setFaltas] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {

        const fetchInfo = async (id) => {
            
            try{
                const response = await api.get(`/presenca/information/${id}`);
                console.log(response.data.user);
                setUser(response.data.user);
                setFaltas(response.data.falta);

            }catch(error){

                console.log('Erro ao trazer as informações: ',error.response.data);
            
            }finally{

                setLoading(false);
            }
        }

        fetchInfo(id);

    }, []);

    if (loading) return <Loading />;

    return (
        <>
        <Header />
        <main style={{ padding: "6rem 0", flexDirection: "column" }}>
            <HeadTitle text="Controle De Faltas e Presenças"/>
            <article className="flex flex-col w-9/10 min-h-30 border border-gray-300 rounded-lg">

                <div className="h-50 w-full flex items-center justify-center px-4 py-2">
                    <div className="flex-1 h-9/9 flex items-center justify-center rounded-lg overflow-hidden border-2 border-gray-300 text-center">
                        {user.image ? 
                        (<img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                        ) 
                        : 
                        (<FaUser className="text-blue-500 text-9xl" />)}
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
                    
                <div className="flex-2 flex w-full items-center justify-center font-bold py-2">
                    <div className="flex-1 h-full text-center">
                        <p>Faltas: <span>{user.presenca.filter(p => p.status === 'ausente').length}</span></p>
                        <p>Presenças: <span>{user.presenca.filter(p => p.status === 'presente').length}</span></p>
                    </div>

                    <div className="flex-1 h-full text-center">
                        <p>Justificadas: <span>{user.presenca.filter(p => p.justificada === 1 && p.status === 'ausente').length}</span></p>
                        <p>N/Justificadas: <span>{user.presenca.filter(p => p.justificada === 0 && p.status === 'ausente').length}</span></p>
                    </div>
                </div>
                <div className="h-50 w-full flex flex-col overflow-y-scroll" >
                    <div className="w-full h-10 flex items-center justify-evenly text-2xl text-gray-700 font-bold gap-2 border-b border-gray-900">
                        <div className="flex-1 text-center">
                            <h2>Faltas</h2>
                        </div>

                        <div className="flex-1 text-center">
                            <h2>Situação</h2>
                        </div>
                            
                        <div className="flex-1 text-center">
                            <h2>Data</h2>
                        </div>
                    </div>
                    
                    {faltas.map((f) => (
                            
                        (<div key={f.id} className="w-full h-8 flex items-center justify-evenly font-bold gap-2" id={f.justificada ? ('just'):('notJust')}>
                            <div className="flex-1 text-center border-b border-b-blue-400">
                                <p>Falta</p>
                            </div>

                            <div className="flex-1 text-center border-b border-b-blue-400">
                                <p>{f.justificada ? ('Justificada') : ('N/Justificada')}</p>
                            </div>

                            <div className="flex-1 text-center border-b border-b-blue-400">
                                <p>{format(new Date(f.created_at), 'dd/MM/yyyy', { locale: pt })}</p>
                            </div>
                        </div>) 

                        ))

                    }
                </div>
            </article>

        </main>
        </>
    );

}
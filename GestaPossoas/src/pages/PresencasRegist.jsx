import { useEffect, useState } from 'react'
import '../app.css'
import api from '../api';
import Loading from '../components/Loading';
import Header from '../components/Header';
import HeadTitle from '../components/HeadTitle';
import { FaUser } from 'react-icons/fa';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import SimplesBack from '../components/SimplesBack';
import Alert from '../components/Alert';

export default function PresencasRegist(){
    const [users, setUsers] = useState('');
    const [user, setUser] = useState('');
    const [justificada, setJustificada] = useState('');
    const [presente, setPresente] = useState('');
    const [userId, setUserId] = useState('');
    const [aviso, setAviso] = useState('');
    const [loading, setLoading] = useState(true);
    const navegate = useNavigate();

    useEffect(() => {

        const fetchUser = async () => {
            try{
                const response = await api.get('/user/depAll');
                setUsers(response.data.users);

            }catch(error){
                console.log('Erro ao trazer usuários: ',error.response.data);

            }finally{
                setLoading(false);
            }
        }

        fetchUser();

    }, []);

    if (loading) return <Loading/>;

    function getUser(id){

        const selected = users.find(user => user.id == id);
        setUser(selected);
        setUserId(id);

    }

    async function sendData(data){

        try{

            const response = await api.post('/presenca/create', data);
            console.log(response.data);
            navegate('/presencas');

        }catch(error){

            console.log('Erro ao registrar presença: ',error.response.data);

        }

    }

    function getData(e){
        e.preventDefault();

        if (userId && presente && justificada){

            const data = {
            user_id: userId,
            presente: presente,
            justificada: justificada
            }

            sendData(data);

        }else{

            setAviso('Porfavor, Selecione todos campos necessário!');

        }

    }

    return (
        <>
            <Header />
            <main style={{padding: "6rem 0"}}>
                <SimplesBack back="/presencas"/>
                <HeadTitle text="Registro De Faltas & Presenças"/>
                {aviso ? 
                (<Alert aviso={aviso}/>) 
                : 
                (<></>)
                }

                <div className="w-full min-h-20 flex flex-col items-center justify-center">

                    {user ? 
                    (<div className="h-40 w-6/10 flex border-b-0 border border-gray-500 rounded-lg p-2">
                        <div className="flex-1 h-full border border-gray-500 rounded-lg overflow-hidden text-center">
                            {user.image ? 
                            (<img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                            ) 
                            : 
                            (<FaUser className="text-blue-500 text-9xl" />)}
                        </div>

                        <div className="flex-2 h-full pl-6">

                            <p>Nome: <span className="text-gray-500">{user?.first_name} {user.last_name}</span></p>
                            <p>Departamento: <span className="text-gray-500">{user?.departamento.denominacao}</span></p>
                            <p>Cargo: <span className="text-gray-500">{user?.funcao.denominacao}</span></p>
                            <p>Morada: <span className="text-gray-500">{user?.morada}</span></p>
                            <p>Efectividade: <span className="text-gray-500">{user?.suspensao.efectivo ? "Efectivo" : "Não Efectivo"}</span></p>
                            <p>Contratado em: <span className="text-gray-500">{ format(new Date(user?.created_at), 'dd/MM/yyyy', { locale: pt }) }</span></p>

                        </div>
                    </div>) : ('')}

                    <form className="flex-1 w-6/10 flex flex-col border border-t-0 border-mist-700 rounded-lg" onSubmit={getData}>

                        <div className="flex-1 w-full flex flex-col p-4">
                            <label htmlFor="user" className="flex-1 font-bold ml-4">Funcionário</label>
                            <select id="user" className="h-9/10 w-4/10 border border-blue-300 rounded-lg p-2 text-blue-500" 
                            onChange={(e) => getUser(e.target.value)}>
                                <option>Indefinido</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                                ))

                                }
                            </select>
                        </div>

                        <div className="flex-2 w-full flex px-4">
                            <div className="flex-1 w-full flex flex-col">
                                <div className="flex-1 w-full flex pr-20">
                                    <label htmlFor="present" className="flex-1">Presente</label>
                                    <input type="radio" id="present" name="presente" value="1" className="border border-blue-300 rounded-lg" 
                                    onChange={(e) => setPresente(e.target.value)}/>
                                </div>
                                
                                <div className="flex-1 w-full flex pr-20">
                                    <label htmlFor="ausent" className="flex-1">Ausente</label>
                                    <input type="radio" id="ausent" name="presente" value="0" className="border border-blue-300 rounded-lg" 
                                    onChange={(e) => setPresente(e.target.value)}/>
                                </div>
                            </div>

                            <div className="flex-1 w-full flex flex-col">
                                <div className="flex-1 w-full flex pr-20">
                                    <label htmlFor="justifyed" className="flex-1">Justificada</label>
                                    <input type="radio" id="justifyed" name="justificada" value="1" className="border border-blue-300 rounded-lg" 
                                    onChange={(e) => setJustificada(e.target.value)}/>
                                </div>
                                
                                <div className="flex-1 w-full flex pr-20">
                                    <label htmlFor="notJustifyed" className="flex-1">Não Justificada</label>
                                    <input type="radio" id="notJustifyed" name="justificada" value="0" className="border border-blue-300 rounded-lg" 
                                    onChange={(e) => setJustificada(e.target.value)}/>
                                </div>
                            </div>
                            
                        </div>

                        <div className="flex-1 w-full flex items-center p-4 gap-4">
                            <button type="submit" className="flex-1 p-3 bg-blue-300 rounded-lg">
                                Registrar
                            </button>
                            
                            <button type="reset" className="flex-1 p-3 bg-red-300 rounded-lg">
                                Cancelar
                            </button>
                        </div>

                    </form>

                </div>

            </main>

            <Footer />
        </>
    );

}
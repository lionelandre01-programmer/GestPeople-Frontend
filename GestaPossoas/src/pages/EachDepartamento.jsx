import '../app.css'
import api from '../api'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Header from '../components/Header';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { FaTasks, FaMinus, FaPlus, FaUser } from 'react-icons/fa';

export default function EachDepartamento(props){

    const [users, setUsers] = useState('');
    const [members, setMembers] = useState('');
    const [dep, setDep] = useState('');
    const [bestUser, setBestUser] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {

        const fetchEachDep = async(id) => {

            try{

                const response = await api.get(`/departamento/each/${id}`);
                setUsers(response.data.users);
                setMembers(response.data.members);
                setDep(response.data.dep);
                setBestUser(response.data.bestUser);
                console.log(response.data.users);

            } catch (error){

                console.log('Erro ao buscar departamento: ',error.response.data);
            
            }finally{

                setLoading(false);
                setSelectedUser('');

            }
        }

        fetchEachDep(id);

    }, [props.reload]);

    if (loading) return <Loading />

    function getUser(id){

        const selected = users.find(user => user.id === id );
        setSelectedUser(selected);

    }

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
        <main className="flex-col" style={{minHeight: "100vh", gap: "0", backgroundColor: "aliceblue"}}>
            <div className="w-full flex-1 text-center border border-blue-500 text-3xl pt-2.5">
                <h1>Departamento {dep.denominacao}</h1>
            </div>

            <div className="w-full flex flex-1 text-start pl-5 text-2xl font-bold">
                <h2 className="inline" style={{display: "inline", color: "blue"}}>Responsável Por</h2> &nbsp;
                <p>{dep.responsabilidade}</p>
            </div>

            <div className="w-full flex-4 flex py-2 items-center justify-evenly font-bold">
                <div className="w-3/10 h-full bg-cyan-600 border border-blue-500 rounded-lg text-center py-3">
                    <h2>Membros</h2>
                    <span>{members}</span>
                </div>
                
                <div className="w-3/10 h-full bg-blue-700 border border-blue-500 rounded-lg text-center py-3">
                    <h2>Data De Criação</h2>
                    <span>{format(new Date(dep.created_at), "dd/MM/yyyy", { locale: pt })}</span>
                </div>
                
                <div className="w-3/10 h-full bg-gray-700 border border-blue-500 rounded-lg text-center flex flex-col py-3">
                    {bestUser ? 
                    (<>
                    <h2>Melhor Membro: <span>{bestUser.user.first_name} {bestUser.user.last_name}</span></h2>
                    <span>Desempenho: {bestUser.nivel}%</span></>)
                : (<h2>Melhor Membro: <br /> <span>Ainda Sem Dados</span></h2>)}
                </div>
            </div>
            
            <div className="w-full flex-6 flex flex-col rounded-lg overflow-hidden border-t">
                <div className="w-full h-2/10 text-center text-blue-600 text-4xl font-bold pt-6 bg-gray-900 mb-2">
                    <h1>Membros</h1> <br />
                </div>

                <div className="w-dvw h-8/10 flex border-t ml-4">
                    <div className="flex flex-col overflow-y-scroll w-3/10 min-h-60 border-r border-blue-600">
                        {users.map((user) => (
                            <button key={user?.id} className="border border-blue-400 py-1 px-2 text-start" 
                            onClick={() => getUser(user?.id)}>
                                {user?.first_name} {user?.last_name}
                            </button>
                        ))

                        }
                    </div>

                    <div className="w-9/14 min-h-60 border-l border-blue-500 p-2">

                        {selectedUser ? 
                        (<article key={selectedUser.id} className="flex flex-col items-center justify-evenly w-full h-full p-4 rounded-lg" style={{backgroundColor: "#d4d6e2"}}>
                            <div className="w-full h-6/10 flex items-center justify-evenly">
                                <div className="w-3/10 h-35 border border-blue-600 rounded-lg overflow-hidden text-center">
                                    {selectedUser.image ? 
                                    (<img src={`http://127.0.0.1:8000/storage/${selectedUser.image}`} alt="Perfil" className="w-full h-full object-cover"/>) 
                                    : 
                                    (<FaUser className="text-blue-500 text-8xl mt-3" />)}
                                </div>
                        
                                <div className="w-7/10 h-full pl-2 text-blue-700 font-bold">
                                    <h3>Nome: <span className="text-black font-normal">{selectedUser.first_name} {selectedUser.last_name}</span> </h3>
                                    <h3>Gênero: <span className="text-black font-normal">{selectedUser.genero}</span></h3>
                                    <h3>Função: <span className="text-black font-normal">{selectedUser.funcao.denominacao}</span></h3>
                                    <h3>Contratado em: <span className="text-black font-normal">{format(new Date(selectedUser.created_at), "dd/MM/yyyy HH:mm", { locale: pt })}</span></h3>
                                    <h3>Efectividade: <span className="text-black font-normal">{selectedUser.efectividade}</span></h3>
                                </div>
                            </div>
                        
                            <div className="w-full h-3/10 flex flex-col items-center justify-center mb-2 font-bold">
                                {selectedUser.ult_desempenho ? 
                                (<div className="w-full h-full flex-1 text-center">
                                <h2> <FaTasks/> Desempenho: {selectedUser.ult_desempenho.nivel}%</h2>
                                { selectedUser.ult_desempenho.nivel >= 90 ? (<progress value={selectedUser.ult_desempenho?.nivel} max="100" className="w-full" id="progressExcellent">
                                                    
                                </progress>) 
                                : selectedUser.ult_desempenho.nivel >= 70 && selectedUser.ult_desempenho.nivel < 90 ? (<progress value={selectedUser.ult_desempenho?.nivel} max="100" className="w-full" id="progressGood">
                                                    
                                </progress>) 
                                : selectedUser.ult_desempenho.nivel > 40 && selectedUser.ult_desempenho.nivel < 70 ? (<progress value={selectedUser.ult_desempenho?.nivel} max="100" className="w-full" id="progressNormal">
                                                    
                                </progress>) 
                                : (<progress value={selectedUser.ult_desempenho?.nivel} max="100" className="w-full" id="progressBad">
                                                    
                                </progress>)}
                                </div>)
                                :
                                (<div className="w-full h-full flex-1 text-center">
                                <h2> <FaTasks/> Desempenho</h2>
                                <h2 className="text-red-400">Ainda Sem Avaliação</h2>
                                </div>)}
                            </div>
                                            
                            <div className="w-full h-3/12 flex items-center justify-evenly">
                                <button className="border rounded-lg py-2 px-10 bg-red-500" 
                                onClick={() => getDados(selectedUser.id, "-")}><FaMinus /></button>
                                <button className="border rounded-lg py-2 px-10 bg-blue-400" 
                                onClick={() => getDados(selectedUser.id, "+")}><FaPlus /></button>
                            </div>
                        </article>) : ("")}
                        
                    </div>
                </div>
                
            </div>
        </main>
        <Footer />
        </>
    );

}
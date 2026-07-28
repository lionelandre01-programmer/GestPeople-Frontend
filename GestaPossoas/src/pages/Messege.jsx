import { useEffect, useState } from "react";
import api from "../api";
import '../app.css';
import Loading from "../components/Loading";
import Back from "../components/Back";
import Sucesso from "../components/Sucesso";
import HeadTitle from "../components/HeadTitle";
import { FaUser, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useAuth } from "../context/AuthContext";
import { useRevalidator } from "react-router-dom";

export default function Messege(){
    const { user } = useAuth();
    const [messeges, setMesseges] = useState('');
    const [chats, setChats] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [send, setSend] = useState(true);
    const [body, setBody] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [toUserId, setToUserId] = useState('');

    useEffect(() => {

        /*function updataLocal(){

            if (localStorage.getItem('recept')){

                const recept = JSON.parse(localStorage.getItem('recept'));
                console.log(recept);

                const recep = messeges.filter(mes => mes.to_user.id == recept.id);
                
                const usuario = JSON.parse(localStorage.getItem('recept'));

                setName(usuario.to_user.first_name + " " + usuario.to_user.last_name);
                setChats(recep);

            }

        }*/

        async function fetchMessege(){

            try{
                //{eachUser: cada usuário, allMesseges: todas as mensagens}
                const response = await api.get('/messege');
                setMesseges(response.data);
                console.log(response.data);
                updataLocal();

            }catch(error){

                console.log("Erro ao recolher as mensagens: ",error.response.data);

            }finally{

                setLoading(false);

            }
        }

        fetchMessege();

    }, [send]);

    if (loading) return <Loading />;

    async function sendMessege(data){

        try{

            const response = await api.post('/messege/send', data);
            setMensagem(response.data);
            setSend(prev => !prev);
            setBody('');

        }catch(error){

            console.log("Erro ao enviar mensagem: ",error.response.data);

        }

    }

    async function deleteMessege(id){

        const conf = Boolean(confirm("Deseja Eliminar Esta Mensagem?"));

        if (conf){

            try{
                const response = await api.post(`messege/delete/${id}`);
                setMensagem(response.data);
                setSend(prev => !prev);

            }catch(error){

                console.log("Erro ao deletar mensagem: ",error.response.data);

            }

        }else{
            
            return;
        }

    }

    function getChat(id){

        const mensagens = messeges.allMessege.filter(mens => 
            mens.to_user_id == user.id && mens.from_user_id == id || 
            mens.to_user_id == id && mens.from_user_id == user.id);
        const recep = mensagens.find(one => one.to_user_id == id || one.from_user_id == id);
        setChats(mensagens); console.log(mensagens); console.log(recep); console.log(id);

        if (recep.to_user_id != user.id){

            setName(recep.to_user.first_name + " " + recep.to_user.last_name);
            
            setToUserId(recep.to_user_id);
            localStorage.setItem('recept', JSON.stringify(recep.to_user));

        }else{

            setName(recep.from_user.first_name + " " + recep.from_user.last_name);
            
            setToUserId(recep.from_user_id);
            localStorage.setItem('recept', JSON.stringify(recep.to_user));
        }

    }

    function getData(e){
        e.preventDefault();

        const touser = JSON.parse(localStorage.getItem('recept'));

        const data = {
            from_user_id: user.id,
            to_user_id: toUserId,
            body: body
        }

        sendMessege(data);

    }

    return (
        <>
        <Back back="/"/>
        {mensagem ? <Sucesso messege={mensagem}/> : ""}
        <main className="pt-8">

            <HeadTitle text="Mensagens"/>

            <div className="flex min-h-40 w-full">
                <aside className="w-3/10 h-full border-r-2 border-gray-300 p-4 flex flex-col gap-3">
                    {messeges.eachUser.map(messege => (

                        <article key={messege.id} onClick={() => getChat(messege.from_user_id == user.id ? messege.to_user_id : messege.from_user.id)} 
                        className="flex items-center justify-center w-full min-h-8 border border-gray-300 rounded-lg cursor-pointer gap-3 p-2">
                            
                            <div className="w-3/10 h-15 rounded-full overflow-hidden border-2 border-gray-500 text-center">

                                {messege.from_user_id == user.id && messege.to_user_id == user.id && messege.from_user.image ?
                                (<img src={`http://127.0.0.1:8000/storage/${messege.to_user.image}`} alt="Perfil" className="w-full h-full object-cover"/>) 

                                : messege.to_user_id == user.id && messege.from_user.image ?
                                (<img src={`http://127.0.0.1:8000/storage/${messege.from_user.image}`} alt="Perfil" className="w-full h-full object-cover"/>) 

                                : messege.from_user_id == user.id && messege.to_user.image ?
                                (<img src={`http://127.0.0.1:8000/storage/${messege.to_user.image}`} alt="Perfil" className="w-full h-full object-cover"/>)
                                :
                                (<FaUser className="text-blue-500 text-5xl" />) }
                            </div>

                            <div className="w-6/10 h-9/10 text-center overflow-hidden flex flex-col gap-1 text-xl">
                                {messege.from_user_id == user.id ? (<span className="font-mono font-bold">{messege.to_user.first_name} {messege.to_user.last_name}</span>) 
                                : 
                                (<span className="font-mono font-bold">{messege.from_user.first_name} {messege.from_user.last_name}</span>)}
                                <span>{messege.body}</span>
                            </div>
                        
                        </article>

                    ))

                    }
                </aside>

                <aside className="w-7/10 min-h-[50vh] flex flex-col gap-2 text-center">
                    {chats ? 

                    (
                        <div className="w-full h-full flex flex-col items-center gap-3 px-4 relative rounded-lg pb-[10vh]" style={{backgroundColor: "#d4d6e2"}}>
                            <div className="h-2/10 w-full text-center text-blue-700 font-bold text-2xl">
                                <h1>{name}</h1>
                            </div>

                            <div className="max-h-[45vh] w-full flex flex-col gap-3 overflow-y-scroll">
                                {chats.map(chat => (
                                    
                                    <div key={chat.id} className="min-w-[30%] h-auto bg-blue-500 rounded-lg p-3 self-start" id={chat.from_user_id == user.id ? "messegeBlue" : "messegeGray"}>

                                        <div className="w-full h-auto flex items-center gap-2 mb-2">
                                            <span>{!chat.delete ? chat.body : <p className="text-xl font-semibold text-gray-600"> <em>Mensagem Eliminada</em> </p>}</span>
                                        </div>

                                        {!chat.delete ? 
                                        <div className="w-full text-end flex justify-between mt-4">
                                            <button onClick={() => deleteMessege(chat.id)}>
                                                <abbr title="Excluir Mensagem" className="text-xl"><FaTrash /></abbr>
                                            </button>
                                            <span>{format(new Date(chat.created_at), "dd/MM/yyyy HH:mm", { locale: pt })}</span>
                                        </div> : ''}

                                    </div>
                                    
                                ))

                                }
                            </div>

                            <form className="w-full min-h-[7vh] max-h-[15vh] flex bottom-0 absolute px-2 pb-1" onSubmit={getData}>
                                <textarea placeholder="Escreva sua mensagem..." className="w-full h-full rounded-lg border border-gray-300 px-4 bg-white" 
                                onChange={(e) => setBody(e.target.value)}>
                                </textarea>
                                <button type="submit" className="w-20 h-full px-4 py-3 ml-2 bg-blue-500 text-white rounded-lg">Enviar</button>
                            </form>

                        </div>
                    )
                    : 
                    "Selecione uma conversa"
                    }
                </aside>
            </div>

        </main>
        </>
    );

}
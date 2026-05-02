import '../app.css'
import api from '../api'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeadTitle from '../components/HeadTitle';
import { FaPlus, FaUserTie } from 'react-icons/fa';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function Funcao(){
    const [funcao, setFuncao] = useState('');
    const [members, setMembers] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fecthFun = async () => {

            try{

                const response = await api.get('/funcao');
                setFuncao(response.data.funcao);
                setMembers(response.data.members);
            
            }catch(error){

                console.log("Erro ao pegar as funções: ",error.response.data);

            }finally{

                setLoading(false);

            }
        }

        fecthFun();

    }, []);

    if (loading) return <Loading />;

    return (
        <>
            <Header />
            <main style={{padding: "6rem 0", alignItems: "stretch", minHeight: "50vh"}}>

                <HeadTitle text="Funções Disponíveis"/>

                <Link className="border rounded-lg p-4 absolute top-34 right-8 hover:bg-blue-400 transition duration-900" to="/funcoes/create">
                <FaPlus />Add Função
                </Link>

                {funcao.map((f) => (

                    <article key={f.id} className="w-3/10 min-h-15 flex flex-col items-center justify-evenly border border-blue-500 rounded-lg py-2 px-1">
                        <div className="w-full flex-2 text-3xl text-blue-700 text-center">
                            <FaUserTie />
                        </div>

                        <div className="w-full flex-1 text-center font-bold text-blue-600 border-b">
                            <h2>Função: <span>{f.denominacao}</span></h2>
                        </div>

                        <div className="w-full flex-2 text-center mb-3">
                            <h2 className="font-black">Responsabilidade: <br /> <span className="font-normal">{f.responsabilidade}</span></h2>
                        </div>

                        <div className="w-full flex-1 text-start font-bold">
                            <h2>Cadastrada em: <span className="text-blue-600">{format(new Date(f.created_at), "dd/MM/yyyy", {locale: pt})}</span></h2>
                        </div>
                        
                        <div className="w-full flex-1 text-start font-bold">
                            <h3>Usuários: <span className="text-blue-600">{members.filter(me => me.funcao_id === f.id).length}</span></h3>
                        </div>
                    </article>

                ))

                }

            </main>
            <Footer />
        </>
    );

}
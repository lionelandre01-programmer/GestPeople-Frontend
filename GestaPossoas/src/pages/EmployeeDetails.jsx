import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import '../app.css';
import Loading from "../components/Loading";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import FormatarMoeda from "../components/FormatarMoeda";
import FormatarPercentagem from "../components/FormatarPercentagem";

export default function EmployeeDetails(){
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const { id } = useParams();
    const navega = useNavigate();

    useEffect(() => {

        async function fetchDetails(id){

            try{

                const response = await api.get(`/user/${id}`);
    
                setStats({
                    employee: response.data.user,
                    salario: response.data.salario,
                    desconto: response.data.desconto,
                    presenca: response.data.presenca,
                    mensagem: response.data.mensagem,
                    movimento: response.data.movimento,
                    suspensao: response.data.suspensao,
                    desempenho: response.data.desempenho,
                    pagamento: response.data.pagamento
                });

                console.log(stats);

            } catch (error){

                console.log("Erro ao trazer os datalhes: ",error.response.data);

            } finally {
                setLoading(false);
            }

        }

        fetchDetails(id);

    }, []);

    if (loading) return <Loading />;

    const navi = (id) =>{
        navega(`/employees/details/edit/${id}`);
    }

    const naviSalario = (id) => {
        navega(`/salario/edit/${id}`);
    }

    return (
        <>
            <Header />
            <main className="flex-grow bg-gray-50 py-12 px-6 md:px-12 lg:px-24 pt-20">

                <HeadTitle text="Detalhes Do Funcionário" />
                
                <div className="grid grid-cols-1 items-start md:items-stretch md:grid-cols-2 gap-2">
                    <aside className="px-2 pt-5">
                        <article className="border rounded-2xl p-6 bg-gray-300 flex flex-col">
                            <div className="flex flex-col items-center mb-6 w-full item-center justify-center">
                                {stats.employee.image ? 
                                (<div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
                                    <img src={`http://127.0.0.1:8000/storage/${stats.employee.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                                </div>) 
                                  : 
                                (<FaUser className="text-blue-500 text-4xl mr-4 w-45 h-40 border p-5 rounded-full" />)}
                                <div className="text-center">
                                    <h2 className="text-3xl font-semibold text-gray-800">
                                      {stats.employee?.first_name} {stats.employee?.last_name || ''}
                                    </h2>
                                    <p className="text-gray-600 text-xl">Código De Funcionário: {stats.employee.id}</p>
                              </div>
                           </div>

                            <div className="font-semibold text-[#011d3a] text-xl">
                                <h1 className="w-full text-3xl ml-3 font-black">Dados Pessoais</h1>
                                <p>Nome: <span className="font-normal text-blue-500">{stats.employee.first_name}</span></p>
                                <p>Sobrenome: <span className="font-normal text-blue-500">{stats.employee.last_name}</span></p>
                                <p>Telefone: <span className="font-normal text-blue-500">{stats.employee.phone || '+244...'}</span></p>
                                <p>E-Mail: <span className="font-normal text-blue-500">{stats.employee.email || 'funcionario@gmail.com'}</span></p>
                                <p>Gênero: <span className="font-normal text-blue-500">{stats.employee?.genero}</span></p>
                                <p>Endereço: <span className="font-normal text-blue-500">{stats.employee.morada || 'N/Informado'}</span></p>
                                <p>Data De Nascimento: <span className="font-normal text-blue-500">{format(new Date(stats.employee.nascimento), 'dd/MM/yyyy',{ locale: pt })}</span></p>
                                <p>Departamento: <span className="font-normal text-blue-500">{stats.employee?.departamento.denominacao}</span></p>
                                <p>Função: <span className="font-normal text-blue-500">{stats.employee?.funcao.denominacao}</span></p>
                                <p>Contratado em: <span className="font-normal text-blue-500">{format(new Date(stats.employee.created_at), 'dd/HH/yyyy',{ locale: pt })}</span></p>
                            </div>
                            <button onClick={() => navi(stats.employee.id)}
                            className="w-[50%] h-auto py-4 border rounded-lg bg-amber-200 mt-2 self-center font-black text-xl">
                                Editar
                            </button>
                        </article>

                    </aside>
                        
                    <aside className="flex flex-col gap-4 px-2 pt-4">
                        <div className="font-bold border rounded-2xl p-6 text-xl bg-[#0033ff] text-[#d4d6e2]">
                                <h1 className="w-full text-center text-4xl mb-5">Departamento</h1>
                            <div>
                                <p>Departamento: <span className="font-mono">{stats.employee?.departamento.denominacao}</span></p>
                                <p>Responsabilidade: <span className="font-mono">{stats.employee?.departamento.responsabilidade}</span></p>
                                <p>Cadastrado em: <span className="font-mono">{format( new Date(stats.employee?.departamento.created_at), 'dd/HH/yyyy',{ locale: pt })}</span></p>
                            </div>
                        </div>
                        <div className="font-bold border rounded-2xl p-6 text-xl bg-[#0033ff] text-[#d4d6e2]">
                            <h1 className="w-full text-center text-4xl mb-2.5">Função</h1>
                            <div>
                                <p>Departamento: <span className="font-mono font-semibold">{stats.employee?.funcao.denominacao}</span></p>
                                <p>Responsabilidade: <span className="font-mono">{stats.employee?.funcao.responsabilidade}</span></p>
                                <p>Salário Base: <span className="font-mono"> <FormatarMoeda valor={stats.salario.salario} /> </span></p>
                                <p>Cadastrado em: <span className="font-mono">{format( new Date(stats.employee?.funcao.created_at), 'dd/HH/yyyy',{ locale: pt })}</span></p>
                            </div>
                        </div>
                        
                    </aside>

                        <div className="flex flex-col font-bold md:col-span-2 border rounded-2xl p-6 min-h-0 bg-[#011d3a] text-[#f8edd9]">
                            <h1 className="w-full text-center text-4xl mb-2.5">Salário & Subsídios</h1>
                            <div className="flex justify-evenly flex-col gap-2 items-stretch md:flex-wrap md:flex-row md:items-center">
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Salário Base: <span className="font-mono"><FormatarMoeda valor={stats.salario.salario} /></span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Subsídio De Transporte: <span className="font-mono"><FormatarPercentagem value={stats.salario.transporte} /></span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Subsídio De Alimentação: <span className="font-mono"><FormatarPercentagem value={stats.salario.alimentacao} /></span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Subsídio De Desempenho: <span className="font-mono"><FormatarPercentagem value={stats.salario.desempenho} /></span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Subsídio De Presença: <span className="font-mono"><FormatarPercentagem value={stats.salario.presenca} /></span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Salário Processado: 
                                    <span className="font-mono">
                                        <FormatarMoeda valor={Number(stats.salario.salario) + (Number(stats.salario.salario) || 0) * (((Number(stats.salario.transporte) || 0) + (Number(stats.salario.alimentacao) || 0) + (Number(stats.salario.presenca) || 0) + (Number(stats.salario.desempenho) || 0)) / 100)} />
                                    </span>
                                </p>
                            </div>
                            <button onClick={() => naviSalario(stats.salario.id)} 
                                className="min-w-[40%] h-auto py-4 border rounded-lg bg-amber-200 mt-2 self-end font-black text-xl text-black">
                                    Editar Salário
                            </button>
                        </div>

                        <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#ff0707]">
                            <h1 className="w-full text-center text-4xl mb-2.5">Descontos</h1>
                            <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-wrap md:flex-row md:items-center">
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Falas: <span className="font-mono"><FormatarPercentagem value={stats.desconto.faltas || 0} /> /cada</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Faltas Justificadas: <span className="font-mono"><FormatarPercentagem value={stats.desconto.justicadas || 0} /> /cada</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Atrasos: <span className="font-mono"><FormatarPercentagem value={stats.desconto.atrasos || 0} /> /cada</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Mau Desempenho Semanal: <span className="font-mono"><FormatarPercentagem value={stats.desconto.desempenho || 0} /> /cada</span></p>
                            </div>
                        </div>
                        <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#1aa8e9]">
                            <h1 className="w-full text-center text-4xl mb-2.5">Presenças & Ausênças</h1>
                            <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-wrap md:flex-row md:items-center">
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Presenças: <span className="font-mono">{stats.presenca.filter(p => p.status == 'presente').length || 0}</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Faltas<span className="font-mono">{stats.presenca.filter(p => p.status == 'ausente').length || 0}</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Atrasos<span className="font-mono">{stats.presenca.filter(p => p.status == 'atrasado').length || 0}</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Faltas Justificadas: <span className="font-mono">{stats.presenca.filter(p => p.justificada == 1).length || 0}</span></p>
                                <p className="flex flex-col border py-4 px-10 rounded-lg text-center">Faltas N/Justificadas: <span className="font-mono">{stats.presenca.filter(p => p.justificada == 0).length || 0}</span></p>
                            </div>
                        </div>
                        <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#f8edd9]">
                            <h1 className="w-full text-center text-4xl mb-2.5">Últimos Resultados De Desempenho</h1>
                            <div>
                                {stats.desempenho.map(desemp => (
                                    <div key={desemp.id} className="w-full">
                                        <h3>Nível de desempenho: {desemp.nivel}%</h3>
                                        <progress max="100" value={desemp.nivel}></progress>
                                    </div>
                                ))

                                }
                            </div>
                        </div>

                    <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#61d40a]">
                        <h1 className="w-full text-center text-4xl mb-2.5">Últimas Mensagens Enviadas & Recebidas</h1>
                        <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-row md:items-center">
                                
                            <div className="flex flex-col gap-2">
                                <h2>Enviadas</h2>
                                {stats.mensagem.enviadas.map(men => (
                                    <span key={men.id} className="font-mono border py-4 px-10 rounded-lg text-center">{men.body}</span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2>Recebidas</h2>
                                {stats.mensagem.recebidas.map(me => (
                                    <span key={me.id} className="font-mono border py-4 px-10 rounded-lg text-center">{me.body}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#f8edd9]">
                        <h1 className="w-full text-center text-4xl mb-2.5">Últimos Movimentos</h1>
                        <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-wrap md:flex-row md:items-center">
                            {stats?.movimento.map(movi => (
                                <div key={movi.id} className="flex flex-col border py-4 px-10 rounded-lg text-center">
                                    <p>Código: <span className="font-mono">{movi?.id}</span></p>
                                    <p>Actividade: <span className="font-mono">{movi?.action}</span></p>
                                    <p>Data: <span className="font-mono">{format (new Date(movi?.created_at), 'dd/MM/yyyy',{ locale: pt })}</span></p>
                                </div>
                            ))}
                                
                        </div>
                    </div>

                    <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#f8edd9]">
                        <h1 className="w-full text-center text-4xl mb-2.5">Últimos Resultados De Efectividade</h1>
                        <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-wrap md:flex-row md:items-center">
                            {stats?.suspensao.map(sus => (
                            <div key={sus.id} className="flex flex-col border py-4 px-10 rounded-lg text-center">
                                <p>Situação: <span className="font-mono">{sus.efectivo && !sus.suspenso && !sus.demitido ? 
                                    "Activo" : sus.demitido ? "Demitido" : "Suspenso"
                                }</span></p>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="font-bold md:col-span-2 border rounded-2xl p-6 bg-[#011d3a] text-[#f8edd9]">
                        <h1 className="w-full text-center text-4xl mb-2.5">Últimos Pagamentos</h1>
                        <div className="flex justify-evenly gap-2 flex-col items-stretch md:flex-wrap md:flex-row md:items-center">
                            {stats.pagamento.map(pag => (
                            <div key={pag.id} className="flex flex-col border py-4 px-10 rounded-lg">
                                <p>Código: <span className="font-mono">{pag.id}</span></p>
                                <p>Bónus: <span className="font-mono">{pag.bonus}</span></p>
                                <p>Desconto: <span className="font-mono">{pag.desconto}</span></p>
                                <p>Total Pago: <span className="font-mono">{pag.total}</span></p>
                                <p>Data: <span className="font-mono">{format(new Date(pag.data), 'dd/MM/yy',{ locale: pt })}</span></p>
                            </div>
                            ))}
                                
                        </div>
                    </div>
                    
                </div>
            </main>
        </>
    );
}
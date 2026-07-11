import '../app.css'
import api from '../api'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeadTitle from '../components/HeadTitle';
import { FaCalendarAlt, FaEdit, FaPlus, FaUsers, FaUserTie } from 'react-icons/fa';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export default function Funcao() {
    const [funcao, setFuncao] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const fecthFun = async () => {

            try {
                const response = await api.get('/funcao');
                setFuncao(Array.isArray(response.data?.funcao) ? response.data.funcao : []);
                setMembers(Array.isArray(response.data?.members) ? response.data.members : []);

            } catch (error) {
                console.error('Erro ao pegar as funções: ', error);
                setError('Não foi possível carregar as funções neste momento.');

            } finally {
                setLoading(false);
            }
        }

        fecthFun();

    }, []);

    const totalMembers = members.length;

    if (loading) return <Loading />;

    return (
        <>
            <Header />
            <main className="px-4 pb-8 md:px-8 pt-30" style={{ minHeight: '50vh' }}>

                    <HeadTitle text="Funções Disponíveis" />
                    <Link className="absolute right-20 top-80 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow hover:bg-blue-700" to="/funcoes/create">
                        <FaPlus /> Adicionar função
                    </Link>

                {error ? (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {error}
                    </div>
                ) : null}

                <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 relative right-65">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-2xl text-slate-500">Total de funções</p>
                        <p className="mt-2 text-2xl font-semibold text-blue-700">{funcao.length}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-2xl text-slate-500">Utilizadores ligados</p>
                        <p className="mt-2 text-2xl font-semibold text-blue-700">{totalMembers}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-2xl text-slate-500">Gestão Rápida</p>
                        <p className="mt-2 text-sm text-slate-600">Adicionar ou editar funções a qualquer altura.</p>
                    </div>
                </section>

                {funcao.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                        <p className="mb-3 text-lg font-semibold text-slate-700">Nenhuma função registada ainda.</p>
                        <p className="mb-5 text-sm text-slate-500">Comece por criar uma nova função para organizar o seu sistema.</p>
                        <Link className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" to="/funcoes/create">
                            <FaPlus /> Criar função
                        </Link>
                    </div>
                ) : (
                    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {funcao.map((f) => {
                            const membros = members.filter((me) => me.funcao_id === f.id).length;

                            return (
                                <article key={f.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                                            <FaUserTie className="text-3xl" />
                                        </div>
                                        <Link to={`/funcoes/edit/${f.id}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                                            <FaEdit /> Editar
                                        </Link>
                                    </div>

                                    <div className="mb-4 border-b border-slate-100 pb-3">
                                        <h2 className="text-2xl font-semibold text-blue-700">{f.denominacao}</h2>
                                    </div>

                                    <div className="space-y-3 text-xl text-slate-600">
                                        <p className="font-medium text-slate-700">Responsabilidade</p>
                                        <p className='text-sm'>{f.responsabilidade || 'Sem descrição registada.'}</p>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <FaUsers />
                                            <span>{membros} utilizador(es)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt />
                                            <span>{f.created_at ? format(new Date(f.created_at), 'dd/MM/yyyy', { locale: pt }) : '—'}</span>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}

            </main>
            <Footer />
        </>
    );

}
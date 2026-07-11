import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import HeadTitle from "../components/HeadTitle";
import { FaBuilding, FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import '../App.css'
import Footer from "../components/Footer";

export default function Departamentos(){

    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchDep = async() => {

            try{

                const response = await api.get('/departamento/get');
                setDepartamentos(Array.isArray(response.data) ? response.data : []);

            } catch(err){

                console.error("Erro ao buscar os departamentos:", err.response || err.message || err);
                setError('Não foi possível carregar os departamentos.');
            
            }finally{

                setLoading(false);
            } 
        }

        fetchDep();

    }, []);

    const navigateTo = (path) => navigate(path);

    const handleView = (id) => navigateTo(`/eachDep/${id}`);
    const handleEdit = (id) => navigateTo(`/departamento/edit/${id}`);

    const handleDelete = async (id) => {
        const ok = window.confirm('Confirmar eliminação do departamento?');
        if(!ok) return;
        try{
            await api.delete(`/departamento/${id}`);
            setDepartamentos(prev => prev.filter(d => d.id !== id));
        }catch(err){
            console.error('Erro ao eliminar:', err.response || err.message || err);
            alert('Erro ao eliminar departamento.');
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">

                <div className="flex items-center mb-6">
                    <HeadTitle text="Departamentos" />
                    <Link to="/departamento/cadastro" className="inline-flex absolute right-30 items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300" aria-label="Adicionar departamento">
                        <FaPlus /> <span>Adicionar</span>
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6" role="alert">
                        {error}
                    </div>
                )}

                {(!departamentos || departamentos.length === 0) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">Nenhum departamento encontrado.</p>
                        <Link to="/departamento/cadastro" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Criar primeiro departamento</Link>
                    </div>
                ) : (
                    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {departamentos.map((dep) => (
                            <article key={dep.id} className="bg-blue-200 border rounded-lg p-6 shadow-sm hover:shadow-md transition" aria-labelledby={`dep-${dep.id}`}>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                                        <FaBuilding className="text-2xl" aria-hidden />
                                    </div>
                                    <div>
                                        <h2 id={`dep-${dep.id}`} className="text-lg font-black text-gray-800">{dep.denominacao}</h2>
                                        <p className="text-sm text-gray-600 font-bold">Responsável: {dep.responsabilidade || '—'}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-4">
                                    <button type="button" onClick={() => handleView(dep.id)} className="inline-flex items-center gap-2 text-sm px-3 py-2 bg-blue-100 text-blue-800 rounded border transition-all hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label={`Ver departamento ${dep.denominacao}`}>
                                        <FaEye /> Ver
                                    </button>

                                    <button type="button" onClick={() => handleEdit(dep.id)} className="inline-flex items-center gap-2 text-sm px-3 py-2 bg-yellow-100 text-yellow-800 rounded border hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-200" aria-label={`Editar departamento ${dep.denominacao}`}>
                                        <FaEdit /> Editar
                                    </button>

                                    <button type="button" onClick={() => handleDelete(dep.id)} className="ml-auto inline-flex items-center px-2 bg-red-100 text-red-700 rounded-full border hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-200" aria-label={`Eliminar departamento ${dep.denominacao}`}>
                                        <abbr title="Excluir Departamento" className="text-2xl mb-2"><FaTrash /></abbr>
                                    </button>
                                </div>

                            </article>
                        ))}
                    </section>
                )}

            </main>
            <Footer />
        </>
    );

}
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import '../app.css'
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";

export default function Lista() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchFuncionarios = async () => {
      try {
        const response = await api.get('/user/all');
        setFuncionarios(response.data);
      } catch (err) {
        setError('Erro ao carregar funcionários');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Link to="/cadastro" className="flex absolute py-2 px-2.5 text-center bg-blue-600 border rounded-lg right-25 top-45 text-blue-50 font-bold z-0"><FaUserPlus />Add Funcionário</Link>
      <main>
        <div className="w-full mx-auto p-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Lista de Funcionários</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full table-auto">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Nome</th>
                  <th className="px-4 py-2 text-left">Departamento</th>
                  <th className="px-4 py-2 text-left">Função</th>
                  <th className="px-4 py-2 text-left">Situação</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((func) => (
                  <tr key={func.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{func.first_name} {func.last_name}</td>
                    <td className="px-4 py-2">{func.departamento?.denominacao || 'N/A'}</td>
                    <td className="px-4 py-2">{func.funcao.denominacao.toUpperCase() || 'N/A'}</td>
                    <td className="px-4 py-2">{func.ult_suspensao.efectivo ? "Efectivo" : "Não Efectivo"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

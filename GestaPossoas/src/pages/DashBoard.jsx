import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUsers, FaBuilding, FaBriefcase, FaStar, FaUserTie, FaBan, FaCheckCircle } from 'react-icons/fa';

export default function DashBoard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchStats = async () => {
      try {

        const [departmentsRes, rolesRes, bestEmployeesRes, managersRes, suspendedRes, activeRes] = await Promise.all([
          api.get('/departamento/users/count'), // { total: 5, members: { dep1: 10, dep2: 15 } }
          api.get('/funcao/users/count'), // { role1: 20, role2: 30 }
          api.get('/user/bests'), // [{ name: 'João Silva', score: 95 }]
          api.get('/funcao/count'), // { count: 3 }
          api.get('/user/suspended/count'), // { count: 2 }
          api.get('/user/active/count'), // { count: 100 }
        ]);

        setStats({
          departments: departmentsRes.data,
          roles: rolesRes.data,
          bestEmployees: bestEmployeesRes.data,
          managers: managersRes.data.count,
          suspended: suspendedRes.data.count,
          active: activeRes.data.count,
        });
      } catch (err) {
        setError('Erro ao carregar estatísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Carregando dashboard...</p>
        </main>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Número de Departamentos */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <FaBuilding className="text-blue-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Departamentos</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.departments?.total || 0}</p>
              </div>
            </div>

            {/* Número de Gestores */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <FaUserTie className="text-green-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Gestores</h3>
                <p className="text-2xl font-bold text-green-600">{stats.managers || 0}</p>
              </div>
            </div>

            {/* Número de Efectivos */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <FaCheckCircle className="text-green-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Efectivos</h3>
                <p className="text-2xl font-bold text-green-600">{stats.active || 0}</p>
              </div>
            </div>

            {/* Número de Suspensos */}
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <FaBan className="text-red-500 text-3xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Suspensos</h3>
                <p className="text-2xl font-bold text-red-600">{stats.suspended || 0}</p>
              </div>
            </div>

            {/* Funcionários por Função */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <FaBriefcase className="text-purple-500 text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Funcionários por Função</h3>
              <ul className="text-sm">
                {Object.entries(stats.roles || {}).map(([role, count]) => (
                  <li key={role}>{role}: {count}</li>
                ))}
              </ul>
            </div>

            {/* Melhores Funcionários */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <FaStar className="text-yellow-500 text-3xl mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Melhores Funcionários</h3>
              <ul className="text-sm">
                {stats.bestEmployees?.slice(0, 5).map((emp, index) => (
                  <li key={index}>{emp.name} - {emp.score}%</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Membros por Departamento */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <FaUsers className="text-indigo-500 text-3xl mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Membros por Departamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(stats.departments?.members || {}).map(([dep, count]) => (
                <div key={dep} className="flex justify-between">
                  <span>{dep}</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

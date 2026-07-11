import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import HeadTitle from '../components/HeadTitle';
import '../app.css';

export default function Movimentos() {
  const [movimentos, setMovimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovimentos() {
      try {
        const response = await api.get('/movimento');
        setMovimentos(response.data || []);
      } catch (fetchError) {
        console.error('Erro ao carregar movimentos:', fetchError?.response?.data || fetchError);
        setError('Não foi possível carregar os movimentos.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovimentos();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 pt-24 px-6 md:px-12 lg:px-24">
        <HeadTitle text="Movimentos do Sistema" />

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 mb-6">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider text-gray-500">Usuário</th>
                <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider text-gray-500">Ação</th>
                <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider text-gray-500">Data</th>
                <th className="px-6 py-3 text-left text-xl font-medium uppercase tracking-wider text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {movimentos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-xl text-gray-500">
                    Nenhum movimento encontrado.
                  </td>
                </tr>
              ) : (
                movimentos.map((movimento) => (
                  <tr key={movimento.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-gray-900">{movimento.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl text-gray-900">
                      {movimento.user?.first_name || '—'} {movimento.user?.last_name || ''}
                    </td>
                    <td className="px-6 py-4 text-xl text-gray-700">{movimento.action}</td>
                    <td className="px-6 py-4 text-xl text-gray-500">
                      {movimento.created_at
                        ? new Date(movimento.created_at).toLocaleString('pt-PT', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '—'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-xl font-medium">
                      <Link
                        to={`/movimentos/details/${movimento.id}`}
                        className="rounded bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-600"
                      >
                        Ver detalhes
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

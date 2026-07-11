import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import HeadTitle from '../components/HeadTitle';
import '../App.css';

function renderValue(value) {
	if (value === null || value === undefined) return '—';
	if (typeof value === 'object') return (
		<pre className="whitespace-pre-wrap text-xl text-gray-700 bg-gray-50 p-3 rounded border border-gray-100 overflow-auto">{JSON.stringify(value, null, 2)}</pre>
	);
	return <div className="text-2xl text-blue-500 font-bold">{String(value)}</div>;
}

export default function MovimentoDetails() {
	const { id } = useParams();
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		async function fetchDetails() {
			setLoading(true);
			try {
				const response = await api.get(`/movimento/information/${id}`);
				const data = response.data || [];
				setItems(Array.isArray(data) ? data : [data]);
			} catch (err) {
				console.error('Erro ao carregar detalhes do movimento:', err?.response?.data || err);
				setError('Não foi possível carregar os detalhes do movimento.');
			} finally {
				setLoading(false);
			}
		}

		if (id) fetchDetails();
	}, [id]);

	if (loading) return <Loading />;

	return (
		<>
			<Header />
			<main className="min-h-screen bg-slate-100 pt-24 px-6 md:px-12 lg:px-24 flex flex-col">
				<HeadTitle text={`Detalhes do Movimento ${id}`} />

				{error && (
					<div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 mb-6">{error}</div>
				)}

				<div className="mb-4 w-full">
					<Link to="/movimentos" className="text-xl font-mono font-black rounded bg-gray-200 px-6 py-3 text-gray-800 hover:bg-gray-300">Voltar à lista</Link>
				</div>

				{items.length === 0 ? (
					<div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">Nenhum detalhe encontrado para este movimento.</div>
				) : (
					<div className="space-y-4 w-full">
						{items.map((entry, idx) => (
							<div key={entry.id ?? idx} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center space-x-4">
										<div className="text-2xl text-gray-500">Registro:</div>
										<div className="text-xl font-medium text-gray-900">{entry.id ?? '—'}</div>
										<div className="text-2xl text-gray-500">Movimento:</div>
										<div className="text-xl text-gray-700">{entry.movimento_id ?? '—'}</div>
									</div>

									<div className="text-2xl text-gray-500">
										{entry.created_at ? new Date(entry.created_at).toLocaleString('pt-PT', {
											day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
										}) : '—'}
									</div>
								</div>

								{entry.motivo && (
									<div className="mb-4">
										<div className="text-2xl font-semibold text-gray-700">Motivo</div>
										<div className="text-xl text-gray-600">{entry.motivo}</div>
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="md:col-span-1 text-2xl">
										<div className=" font-semibold text-gray-700 mb-2">Item</div>
										{renderValue(entry.item)}
									</div>

									<div className="md:col-span-1">
										<div className="text-xl font-semibold text-red-700 mb-2">Antes</div>
										<div className="rounded p-3 border border-red-100 bg-red-50">
											{renderValue(entry.before)}
										</div>
									</div>

									<div className="md:col-span-1">
										<div className="text-xl font-semibold text-green-700 mb-2">Depois</div>
										<div className="rounded p-3 border border-green-100 bg-green-50">
											{renderValue(entry.after)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</>
	);
}


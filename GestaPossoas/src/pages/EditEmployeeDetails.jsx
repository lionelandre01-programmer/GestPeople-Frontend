import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DivInput from '../components/DivInput';
import DivSelect from '../components/DivSelect';
import DivInputSubmit from '../components/DivInputSubmit';
import Loading from '../components/Loading';
import Processamento from '../components/Processamento';

export default function EditEmployeeDetails(){
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [processamento, setProcessamento] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [morada, setMorada] = useState('');
	const [bi, setBi] = useState('');
	const [genero, setGenero] = useState('');
	const [nascimento, setNascimento] = useState('');
	const [departamento, setDepartamentoId] = useState('');
	const [funcao, setFuncaoId] = useState('');
	const [photo, setPhoto] = useState(null);
	const [departamentos, setDepartamentos] = useState([]);
	const [funcoes, setFuncoes] = useState([]);

	useEffect(() => {
		async function fetchData(id){
			try{
				const [userRes, depRes, funRes] = await Promise.all([
					api.get(`/user/${id}`),
					api.get('/departamento/get'),
					api.get('/funcao/get')
				]);

				const user = userRes.data.user || userRes.data;

				setFirstName(user.first_name || '');
				setLastName(user.last_name || '');
				setEmail(user.email || '');
				setPhone(user.phone || '');
				setMorada(user.morada || '');
				setBi(user.bi || '');
				setGenero(user.genero || '');
				setNascimento(user.nascimento ? user.nascimento.split('T')[0] : '');
				setDepartamentoId(user.departamento?.id || '');
				setFuncaoId(user.funcao?.id || '');
				setPhoto(user.image || null);

				setDepartamentos(depRes.data || []);
				setFuncoes(funRes.data || []);

			} catch(error){
				console.error('Erro ao carregar dados do usuário:', error);
				alert('Erro ao carregar dados do usuário');
			} finally{
				setLoading(false);
			}
		}

		fetchData(id);
	}, [id]);

	if (loading) return <Loading />;

	async function handleSubmit(e){
		e.preventDefault();
		setProcessamento(true);

		try{
			const formData = new FormData();
			formData.append('id', id);
			formData.append('first_name', firstName);
			formData.append('last_name', lastName);
			formData.append('email', email);
			formData.append('phone', phone);
			formData.append('morada', morada);
			formData.append('bi', bi);
			formData.append('nascimento', nascimento);
			formData.append('genero', genero);
			formData.append('departamento_id', departamento);
			formData.append('funcao_id', funcao);

			if (photo && photo instanceof File) {
				formData.append('image', photo);
			}

			const usua = await api.post('/user/update', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			});

			alert('Usuário atualizado com sucesso');
			navigate(`/employees/details/${id}`);

		} catch(error){
			console.error('Erro ao actualizar usuário:', error);
			alert('Erro ao actualizar usuário');
		} finally{
			setProcessamento(false);
		}
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="relative flex-grow bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
				{processamento ? <Processamento text="Actualizando..."/> : ''}
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Editar Funcionário</h1>

					<form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							<DivInput
								className="w-full"
								label="firstName"
								labelText="Primeiro Nome"
								type="text"
								value={firstName}
								placeholder="Primeiro Nome"
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setFirstName(e.target.value)}
							/>

							<DivInput
								className="w-full"
								label="lastName"
								labelText="Último Nome"
								type="text"
								value={lastName}
								placeholder="Último Nome"
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setLastName(e.target.value)}
							/>

							<DivInput
								className="w-full"
								label="email"
								labelText="Email"
								type="email"
								value={email}
								placeholder="Email"
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setEmail(e.target.value)}
							/>

							<DivInput
								className="w-full"
								label="phone"
								labelText="Telefone"
								type="text"
								value={phone}
								placeholder="Telefone"
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setPhone(e.target.value)}
							/>

							<DivInput
								className="w-full"
								label="morada"
								labelText="Morada"
								type="text"
								value={morada}
								placeholder="Morada"
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setMorada(e.target.value)}
							/>

							<DivSelect
								className="w-full h-1/6 flex flex-col justify-around font-mono"
								label="sexo" 
								value={genero}
								onChange={(e) => setGenero(e.target.value)} 
								labelText="Seu Gênero" 
								options={['Indefinido','Masculino', 'Feminino']}
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4 py-2"
							/>

							<DivInput
								className="w-full"
								label="nascimento"
								labelText="Data de Nascimento"
								type="date"
								value={nascimento}
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setNascimento(e.target.value)}
							/>

							<div>
								<label htmlFor="dep">Departamento</label>
								<select id='dep' value={departamento} onChange={(e) => setDepartamentoId(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 px-4">
										<option value="">-- Selecionar --</option>
										{departamentos.map(d => (
												<option key={d.id} value={d.id}>
												{d.denominacao}
												</option>
										))}
								</select>
							</div>
                
              
							<div>
								<label htmlFor="fun">Cargo</label>
								<select id='fun' value={funcao} onChange={(e) => setFuncaoId(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 px-4">
										<option value="">-- Selecionar --</option>
										{funcoes.map(f => (
												<option key={f.id} value={f.id}>
												{f.denominacao}
												</option>
										))}
								</select>
							</div>

							<div className="w-full">
								<label htmlFor="photo">Foto do Perfil</label>
								<input
									type="file"
									id="photo"
									accept="image/*"
									className="w-full h-10 rounded-lg border border-gray-300 px-4"
									onChange={(e) => setPhoto(e.target.files[0])}
								/>
							</div>

							<DivInput
								className="w-full"
								label="bi"
								labelText="Número Do BI"
								type="text"
								value={bi}
								classNameInput="w-full h-10 rounded-lg border border-gray-300 px-4"
								onChange={(e) => setBi(e.target.value)}
							/>

						</div>
            
						<DivInputSubmit
							className="w-full flex justify-center"
							classNameSubmit="w-1/3 h-10 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
							classNameReset="w-1/3 h-10 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg ml-4"
							submitText="Atualizar"
							resetText="Cancelar"
						/>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}

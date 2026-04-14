import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FaUser, FaEnvelope, FaPhone, FaCalendar, FaMapMarkerAlt, FaBuilding, FaUserTie, FaFileSignature, FaBullseye, FaSignOutAlt } from "react-icons/fa";

export default function Profile(props) {
  const { user } = useAuth();


  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Carregando perfil...</p>
        </main>
        <Footer />
      </div>
    );

  } else {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Perfil do Usuário</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-6 w-full item-center justify-center">
              {user.image ? 
              (<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
              <img src={`http://127.0.0.1:8000/storage/${user.image}`} alt="Perfil" className="w-full h-full object-cover"/>
                </div>) 
              : 
              (<FaUser className="text-blue-500 text-4xl mr-4" />)}
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.first_name} {user.last_name || ''}
                </h2>
                <p className="text-gray-600">Usuário</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="text-gray-800">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendar className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Data De Nascimento</p>
                  <p className="text-gray-800">{user.nascimento}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Morada</p>
                  <p className="text-gray-800">{user.morada}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaBuilding className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Departamento</p>
                  <p className="text-gray-800">{user.departamento?.denominacao}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaUserTie className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Função</p>
                  <p className="text-gray-800">{user.funcao?.denominacao}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaFileSignature className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Contratado</p>
                  <p className="text-gray-800">{format(new Date(user.created_at), "dd/MM/yyyy HH:mm", { locale: pt })}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaBullseye className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Situação</p>
                  <p className="text-gray-800">{user.efectividade ? 'Efectivo' : 'Não Efectivo'}</p>
                </div>
              </div>
              
            </div>
            
            <div className="flex justify-end space-x-4">
              <Link
                to="/update-user"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
              >
                Editar Perfil
              </Link>
              <button
                onClick={props.onSubmit}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
  }
}

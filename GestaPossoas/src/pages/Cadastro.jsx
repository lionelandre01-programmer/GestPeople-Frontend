import DivInput from "../components/DivInput";
import { useEffect, useState } from 'react';
import api from "../api";
import Back from "../components/Back";
import DivInputSubmit from "../components/DivInputSubmit";
import DivSelect from "../components/DivSelect";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

export default function Cadastro(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [morada, setMorada] = useState('');
    const [dataNascimento, setDataNascimento] = useState('2000-01-01');
    const [email, setEmail] = useState('');
    const [sexo, setSexo] = useState('');
    const [passWord, setPassWord] = useState('');
    const [passWordConf, setPassWordConf] = useState('');
    const [departamento, setDepartamento] = useState([]);
    const [funcao, setFuncao] = useState([]);
    const [fun, setFun] = useState('');
    const [depart, setDepart] = useState('');
    const [aviso, setAviso] = useState('');
    const [loding, setLoading] = useState(true);

    useEffect  (() => {

        const fetchDepartamento = async() => {
        
            try{

            const response = await api.get('/departamento/get');
            const resp = await api.get('/funcao/get');
            
            setDepartamento(response.data);
            setFuncao(resp.data);
            console.log(resp.data);

            } catch(error) {

                console.log('Erro: ',error.response.data);

            }finally{

                setLoading(false);
            }
        };

        fetchDepartamento();
    }, []);

    if (loding) return <Loading />;

    function getDados(e){

        e.preventDefault();

        if (passWord === passWordConf ){
            
            const dados = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            genero: sexo,
            morada: morada,
            nascimento: dataNascimento,
            departamento_id: depart,
            funcao_id: fun,
            email: email,
            password: passWord
            }

            props.onSubmit(dados);

        }else{

            setAviso('As Palavras-Passe não coincidem!');
        }

        

    }


    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center">

            <Back back="/lista"/>

            {aviso ? (<Alert aviso={aviso}/>) : ("")}

            <h2 className="text-center text-2xl text-blue-500 font-bold">CADASTRO DE USUÁRIO</h2>
            <form className="w-11/12 h-10/12 flex border rounded-2xl mb-2" onSubmit={getDados}>

                <div className="w-1/2 h-full flex flex-col items-center justify-evenly">

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="first_name"
                    labelText="Primeiro Nome"
                    type="text"
                    value={firstName}
                    placeholder="Seu Primeiro Nome"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setFirstName(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="last_name"
                    labelText="Último Nome"
                    type="text"
                    value={lastName}
                    placeholder="Seu Último Nome"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setLastName(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="phoneNumber"
                    labelText="Telefone"
                    type="number"
                    value={phone}
                    placeholder="Seu Número De Telefone"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setPhone(e.target.value)}
                    />

                    <DivSelect
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="sexo"
                    labelText="Seu Gênero" 
                    options={['Indefinido','Masculino', 'Feminino']}
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans" 
                    onChange={(e) => setSexo(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="endereco"
                    labelText="Morada"
                    type="text"
                    value={morada}
                    placeholder="Sua Morada"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setMorada(e.target.value)}
                    />

                    <DivInputSubmit 
                    className="w-11/12 h-1/6 flex justify-around font-mono font-black pt-2.5" 
                    classNameSubmit="w-2/5 h-8/12 border rounded-lg bg-blue-400" 
                    classNameReset="w-2/5 h-8/12 border rounded-lg bg-red-400" 
                    submitText="Cadastrar" resetText="Limpar"
                    />

                </div>

                <div className="w-1/2 h-full flex flex-col items-center justify-evenly">

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="nascimento"
                    labelText="Data De Nascimento"
                    type="date"
                    value={dataNascimento}
                    placeholder=""
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setDataNascimento(e.target.value)}
                    />

                    <div className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black">

                        <label htmlFor="departamento">Departamento</label>
                        <select className="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans" 
                        onChange={(e) => setDepart(e.target.value)}>

                            <option>Selecione um departamento</option>
                            {departamento.map(dep => ( 
                                <option key={dep.id} value={dep.id}>{dep.denominacao}</option>
                            ))}

                        </select>
                    </div>

                    <div className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black">

                        <label htmlFor="funcao">Função</label>
                        <select className="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                        onChange={(e) => setFun(e.target.value)}>

                            <option>Selecione uma função</option>
                            {funcao.map(f => (
                                <option key={f.id} value={f.id}>{f.denominacao}</option>
                            ))}

                        </select>
                    </div>

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="emailAdress"
                    labelText="Endreço De E-Mail"
                    type="email"
                    value={email}
                    placeholder="Seu Endereço De E-mail"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="password"
                    labelText="Palavra-Passe"
                    type="password"
                    value={passWord}
                    placeholder="Defina Uma Palavra-Passe"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setPassWord(e.target.value)} 
                    />

                    <DivInput
                    className="w-11/12 h-1/6 flex flex-col justify-around font-mono font-black"
                    label="passwordConf"
                    labelText="Confirmar Palavra-Passe"
                    type="password"
                    value={passWordConf}
                    placeholder="Confirme a Palavra-Passe"
                    classNameInput="w-full h-7/12 rounded-lg border border-gray-300 px-4 font-normal font-sans"
                    onChange={(e) => setPassWordConf(e.target.value)} 

                    />

                </div>

            </form>

        </div>
    );
}
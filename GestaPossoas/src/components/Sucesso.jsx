export default function Sucesso(props){

    return (
        <div className="relative w-9/10 border border-green-700 rounded-lg py-6 px-4 bg-green-300 font-bold text-green-900 text-2xl">
            <h1>{props.messege}</h1>
        </div>
    );

}
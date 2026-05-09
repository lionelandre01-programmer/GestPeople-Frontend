export default function Alert(props){
    return (
        <div 
        className="w-11/12 h-2/16 absolute mb-98 z-0 flex items-center justify-center text-red-500 text-2xl bg-red-100 border border-black rounded-2xl">
            {props.aviso}!
        </div>

    );
}
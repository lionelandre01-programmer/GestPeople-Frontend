export default function DivInputDisable(props){

    return (
        <div className={props.className}>
            <label htmlFor={props.label}>{props.text}</label>
            <input type="text" value={props.value} id={props.label} disabled className="w-full h-9/10 border border-gray-300 rounded-lg px-2"/>
        </div>
    );

}
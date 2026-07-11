
export default function DivSelect(props){

    return (
        <div className={props.className}>
            <label htmlFor={props.label}>{props.labelText}</label>
            <select
                id={props.label}
                className={props.classNameInput}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}

            </select>
        </div>
    );
}
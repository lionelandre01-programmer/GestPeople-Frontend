export default function DivInputSubmit(props){

    return (
        <div className={props.className}>
            <button type="submit" className={props.classNameSubmit}>{props.submitText}</button>
            <button type="reset" className={props.classNameReset}>{props.resetText}</button>
        </div>
    );
}
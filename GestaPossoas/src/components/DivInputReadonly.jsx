export default function DivInputReadonly(props) {
  return (
    <div className={props.className}>
      <label htmlFor={props.label}>{props.labelText}</label>
      <input
        type={props.type}
        value={props.value}
        id={props.label}
        className={props.classNameInput}
        placeholder={props.placeholder}
        onChange={props.onChange} readOnly
      />
    </div>
  );
}
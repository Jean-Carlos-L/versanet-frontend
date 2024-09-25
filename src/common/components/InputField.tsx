import Textfield from "./Textfield";

const InputField = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  error,
  errorId,
}) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-500 mb-2" htmlFor={name}>
      {label}
    </label>
    <Textfield
      label=""
      name={name}
      value={value || ""}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
      aria-describedby={errorId}
      aria-required="true"
    />
    {error && (
      <p id={errorId} className="text-sm text-red-600 mt-1">
        {error}
      </p>
    )}
  </div>
);
export default InputField;

function Textfield(props: TextfieldProps) {
  const {
    name,
    value,
    placeholder,
    label,
    onChange,
    disabled,
    error,
    type = "text",
  } = props;
  return (
    <div className="flex items-center flex-col mb-4">
      <label htmlFor={name} className="font-semibold text-start w-full mb-2">
        {label}
      </label>
      <div className="flex flex-col w-full">
        <input
          type={type}
          placeholder={placeholder}
          className={`input input-bordered w-full max-w-full ${error ? "input-error" : ""
            }`}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <span className="text-red-500 text-sm mt-0.5">{error}</span>}
      </div>
    </div>
  );
}

interface TextfieldProps {
  name: string;
  value: string;
  placeholder: string;
  label: string;
  type?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default Textfield;

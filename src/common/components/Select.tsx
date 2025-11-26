function Select({ options, value, onChange, name, label, error, disabled }: SelectProps) {
   return (
      <div className="flex items-center flex-col mb-4">
         <label htmlFor={name} className="font-semibold w-full text-start mb-2">
            {label}
         </label>
         <div className="flex flex-col w-full">
            <select
               value={value}
               onChange={onChange}
               className={`select select-bordered w-full max-w-full ${error ? "select-error" : ""}`}
               name={name}
               id={name}
               disabled={disabled}
            >
               <option value="">Selecciona una opción</option>
               {options.map((option) => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </select>
            {error && <span className="text-red-500 text-sm mt-0.5">{error}</span>}
         </div>
      </div>
   );
}

interface Option {
   value: string;
   label: string;
}

interface SelectProps {
   options: Option[];
   value: string;
   name: string;
   label: string;
   error?: string;
   disabled?: boolean;
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default Select;
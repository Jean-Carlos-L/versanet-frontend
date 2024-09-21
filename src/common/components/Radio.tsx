import { useId } from "react";

function Radio(props: RadioProps) {
   const { name, value, label, onChange, checked } = props;
   const id = useId();
   return (
      <div className="flex gap-5 items-center">
         <input
            type="radio"
            className="radio"
            value={value}
            name={name}
            id={id}
            onChange={onChange}
            checked={checked}
         />
         <label htmlFor={id}>{label}</label>
      </div>
   );
}

interface RadioProps {
   name: string;
   value: string | number;
   label: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   checked: boolean;
}

export default Radio;
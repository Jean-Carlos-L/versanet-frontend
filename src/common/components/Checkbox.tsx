
function Checkbox(props: CheckboxProps) {
   const { checked, onChange, label, value } = props;
   return (
      <div className="form-control">
         <label className="label cursor-pointer">
            <span className="label-text mr-2">{label}</span>
            <input type="checkbox" checked={checked} className="checkbox" onChange={onChange} value={value} />
         </label>
      </div>
   );
}

interface CheckboxProps {
   checked: boolean;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   label: string;
   value: string | number;
}

export default Checkbox;
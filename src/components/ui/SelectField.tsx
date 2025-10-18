interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string | number; label: string }>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function SelectField({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  placeholder = 'Seleccione una opción'
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#212529] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="appearance-none relative block w-full px-4 py-3 border border-[#CED4DA] text-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#faaf26] focus:border-transparent transition duration-150 disabled:bg-[#E9ECEF] disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

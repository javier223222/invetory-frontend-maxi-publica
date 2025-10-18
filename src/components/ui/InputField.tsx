interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
}

export function InputField({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#212529] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="appearance-none relative block w-full px-4 py-3 border border-[#CED4DA] placeholder-[#ADB5BD] text-[#212529] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#faaf26] focus:border-transparent transition duration-150"
      />
    </div>
  );
}

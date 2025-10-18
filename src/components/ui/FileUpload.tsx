import { useState } from 'react';

interface FileUploadProps {
  label: string;
  id: string;
  name: string;
  onChange: (file: File | null) => void;
  accept?: string;
  required?: boolean;
  currentImage?: string | null;
  helperText?: string;
}

export function FileUpload({
  label,
  id,
  name,
  onChange,
  accept = 'image/*',
  required = false,
  currentImage,
  helperText
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#212529] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="mt-1 flex items-center gap-4">
        {preview && (
          <div className="flex-shrink-0">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 object-cover rounded-lg border-2 border-[#CED4DA]"
            />
          </div>
        )}
        
        <div className="flex-1">
          <label
            htmlFor={id}
            className="cursor-pointer inline-flex items-center px-4 py-3 border border-[#CED4DA] rounded-lg text-sm font-medium text-[#212529] bg-white hover:bg-[#F8F9FA] focus-within:ring-2 focus-within:ring-[#faaf26] transition duration-150"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Seleccionar imagen
          </label>
          <input
            id={id}
            name={name}
            type="file"
            accept={accept}
            required={required}
            onChange={handleFileChange}
            className="sr-only"
          />
          <p className="mt-2 text-xs text-[#6C757D]">
            {helperText || 'PNG, JPG, JPEG hasta 5MB'}
          </p>
        </div>
      </div>
    </div>
  );
}

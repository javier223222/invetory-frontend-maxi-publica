import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({ width = 200, height = 80, className = '' }: LogoProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/logo-maxi-publica.png"
        alt="Maxi Pública"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </div>
  );
}
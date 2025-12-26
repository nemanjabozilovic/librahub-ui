import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { handleImageError } from '../utils/imageHelpers';
import { useLogoPath } from '../utils/logoHelpers';

interface AuthLayoutProps {
  children: ReactNode;
  logoSize?: 'small' | 'large';
  showLogo?: boolean;
}

export const AuthLayout = ({ children, logoSize = 'large', showLogo = true }: AuthLayoutProps) => {
  const logoClass = logoSize === 'large' ? 'h-40 w-auto' : 'h-16 w-auto';
  const logoPath = useLogoPath();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {showLogo && (
          <Link to="/" className="flex items-center justify-center mb-2">
            <img
              src={logoPath}
              alt="LibraHub Logo"
              className={`${logoClass} object-contain`}
              onError={handleImageError}
            />
          </Link>
        )}
        {children}
      </div>
    </div>
  );
};


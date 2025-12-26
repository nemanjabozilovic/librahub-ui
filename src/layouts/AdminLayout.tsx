import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar } from './components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-muted">
      <AdminHeader />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <AdminSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

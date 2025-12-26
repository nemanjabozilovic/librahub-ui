import { useAuth } from '../../features/auth/hooks/useAuth';

export const LibraryPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <h1 className="text-3xl font-bold mb-4 text-foreground">My Library</h1>
        <p className="text-muted-foreground mb-4">
          Welcome to your digital library, {user?.email}!
        </p>
        <p className="text-muted-foreground">
          Your books will appear here once you make a purchase.
        </p>
      </div>
    </div>
  );
};


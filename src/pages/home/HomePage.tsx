import { Link, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
  selectIsAuthenticated,
  selectUser,
  selectAuthLoading,
} from '../../features/auth/store/authSelectors';
import { getRedirectPathForRole } from '../../shared/utils/auth';
import { handleImageError } from '../../shared/utils/imageHelpers';
import { LoadingSpinner } from '../../shared/components';
import { Button } from '../../shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../shared/components/ui/card';

export const HomePage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const user = useAppSelector(selectUser);

  if (isLoading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (isAuthenticated && user) {
    const redirectPath = getRedirectPathForRole(user);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link to="/" className="flex items-center justify-center mb-8">
            <img
              src="/images/logo.png"
              alt="LibraHub Logo"
              className="h-32 w-auto object-contain"
              onError={handleImageError}
            />
          </Link>
          <h1 className="text-5xl font-bold mb-6 text-foreground">Welcome to LibraHub</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your digital library for books, knowledge, and endless reading adventures
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link to="/login">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/library">
              <Button variant="outline" size="lg">Browse Library</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Extensive Collection</CardTitle>
                <CardDescription>
                  Access thousands of books across various genres and categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From classic literature to modern bestsellers, find your next great read
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Easy Access</CardTitle>
                <CardDescription>
                  Read anywhere, anytime on any device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your library follows you wherever you go
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Library</CardTitle>
                <CardDescription>
                  Build and manage your personal collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Keep track of your reading progress and favorites
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};


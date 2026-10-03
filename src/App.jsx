import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Live from '@/pages/Live';
import News from '@/pages/News';
import NewsDetail from '@/pages/NewsDetail';
import Programs from '@/pages/Programs';
import Videos from '@/pages/Videos';
import VideoDetail from '@/pages/VideoDetail';
import Schedule from '@/pages/Schedule';
import About from '@/pages/About';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Embed from '@/pages/Embed';
import HomeOnLoad from '@/components/HomeOnLoad';
import { Navigate } from 'react-router-dom';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors — only block for unregistered users;
  // auth_required is expected for public visitors and should NOT redirect.
  if (authError && authError.type === 'user_not_registered') {
    return <UserNotRegisteredError />;
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<Live />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<VideoDetail />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="/embed/:type" element={<Embed />} />
      <Route path="/embed/:type/:id" element={<Embed />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login?returnTo=/admin" replace />} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <HomeOnLoad />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App

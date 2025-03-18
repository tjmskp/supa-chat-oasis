import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateAd from "./pages/CreateAd";
import Accounts from "./pages/Accounts";
import Analytics from "./pages/Analytics";
import SignIn from "./pages/SignIn";
import TryFree from "./pages/TryFree";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Index from "./pages/Index";
import MetaAuthCallback from "./pages/MetaAuthCallback";
import AuthCallback from "./pages/AuthCallback";
import AdManager from "./pages/AdManager";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Routes>
                <Route path="/index" element={<Index />} />
                <Route 
                  path="/" 
                  element={
                    <>
                      <NavBar />
                      <Home />
                    </>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <ProtectedRoute>
                      <NavBar />
                      <Analytics />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-ad" 
                  element={
                    <ProtectedRoute>
                      <NavBar />
                      <CreateAd />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/accounts" 
                  element={
                    <ProtectedRoute>
                      <NavBar />
                      <Accounts />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <NavBar />
                      <UserProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/analytics" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/try-free" element={<TryFree />} />
                <Route path="/meta-auth-callback" element={<MetaAuthCallback />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/ad-manager" element={<AdManager />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

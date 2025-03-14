
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateAd from "./pages/CreateAd";
import Accounts from "./pages/Accounts";
import Analytics from "./pages/Analytics";
import SignIn from "./pages/SignIn";
import TryFree from "./pages/TryFree";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Get the API keys
  const supabaseUrl = "https://kpidficztwxiupmtgijo.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaWRmaWN6dHd4aXVwbXRnaWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MDYyMzUsImV4cCI6MjA1NzQ4MjIzNX0.Jgx72ODwxppI90pzE9zGHwexXUrqeJeFQU6D6NuStSg";
  
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Anon Key:", supabaseAnonKey);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Routes>
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
                  <>
                    <Dashboard />
                  </>
                } 
              />
              <Route 
                path="/create-ad" 
                element={
                  <>
                    <NavBar />
                    <CreateAd />
                  </>
                } 
              />
              <Route 
                path="/accounts" 
                element={
                  <>
                    <NavBar />
                    <Accounts />
                  </>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <>
                    <NavBar />
                    <Analytics />
                  </>
                } 
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/try-free" element={<TryFree />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

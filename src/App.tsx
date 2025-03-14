
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
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient();

const App = () => {
  // Log Supabase connection info
  console.log("Connected to Supabase project:", supabase.projectRef);

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
                element={<Dashboard />} 
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
              {/* Add the dashboard/analytics route */}
              <Route 
                path="/dashboard/analytics" 
                element={<Dashboard />} 
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

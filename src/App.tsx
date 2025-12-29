import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import NewDonation from "./pages/NewDonation";
import NewNeed from "./pages/NewNeed";
import UploadSurplus from "./pages/UploadSurplus";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/donor/new-donation" element={<NewDonation />} />
          <Route path="/ngo" element={<NgoDashboard />} />
          <Route path="/ngo/new-need" element={<NewNeed />} />
          <Route path="/restaurant" element={<RestaurantDashboard />} />
          <Route path="/restaurant/upload" element={<UploadSurplus />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

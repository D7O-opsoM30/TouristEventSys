
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import EventListing from "./pages/EventListing";
import EventDetails from "./pages/EventDetails";
import UserDashboard from "./pages/UserDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Categories from "./pages/Categories";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/events" element={<Layout><EventListing /></Layout>} />
            <Route path="/events/:id" element={<Layout><EventDetails /></Layout>} />
            <Route path="/categories" element={<Layout><Categories /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/dashboard" element={<Layout><ProtectedRoute><UserDashboard /></ProtectedRoute></Layout>} />
            <Route path="/organizer" element={<Layout><ProtectedRoute><OrganizerDashboard /></ProtectedRoute></Layout>} />
            <Route path="/organizer/create-event" element={<Layout><ProtectedRoute><CreateEvent /></ProtectedRoute></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

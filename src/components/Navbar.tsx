
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-tourism-primary" : "";
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-poppins font-bold text-tourism-primary">
            TourEvents
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium hover:text-tourism-primary transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/events" className={`font-medium hover:text-tourism-primary transition-colors ${isActive('/events')}`}>
              Events
            </Link>
            {/* <Link to="/categories" className={`font-medium hover:text-tourism-primary transition-colors ${isActive('/categories')}`}>
              Categories
            </Link> */}
            <Link to="/about" className={`font-medium hover:text-tourism-primary transition-colors ${isActive('/about')}`}>
              About
            </Link>
          </nav>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NotificationCenter />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-0">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>{currentUser?.name?.substring(0, 2).toUpperCase() || 'UN'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      <span className="w-full text-sm font-medium text-gray-700">
                        {currentUser?.name} - {currentUser?.email}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/dashboard" className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/organizer" className="w-full">Organizer Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" /> Sign In
                  </Link>
                </Button>
                <Button className="bg-tourism-primary hover:bg-tourism-primary/90" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className={`font-medium ${isActive('/')}`} onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/events" className={`font-medium ${isActive('/events')}`} onClick={toggleMenu}>
                Events
              </Link>
              <Link to="/categories" className={`font-medium ${isActive('/categories')}`} onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/about" className={`font-medium ${isActive('/about')}`} onClick={toggleMenu}>
                About
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="font-medium" onClick={toggleMenu}>
                    Dashboard
                  </Link>
                  <Link to="/organizer" className="font-medium" onClick={toggleMenu}>
                    Organizer Dashboard
                  </Link>
                  <Button variant="outline" onClick={() => { handleLogout(); toggleMenu(); }} className="justify-start">
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={toggleMenu} asChild className="justify-start">
                    <Link to="/login">
                      <LogIn className="w-4 h-4 mr-2" /> Sign In
                    </Link>
                  </Button>
                  <Button className="bg-tourism-primary hover:bg-tourism-primary/90 justify-start" onClick={toggleMenu} asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

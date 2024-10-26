import React from "react";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LineChart className="h-6 w-6 text-[#1D4ED8]" />
          <Link to="/" className="text-xl font-bold">FinVerse</Link>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link to="/" className="text-sm relative group transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/chatbot" className="text-sm relative group transition-colors hover:text-primary">
                Chatbot
              </Link>
              <Link to="/portfolio" className="text-sm relative group transition-colors hover:text-primary">
                Portfolio
              </Link>
              <Link to="/about" className="text-sm relative group transition-colors hover:text-primary">
                About
              </Link>
              <Link to="/addfunds" className="text-sm relative group transition-colors hover:text-primary">
                Add Funds
              </Link>
            </>
          ) : (
            <>
              <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-sm relative group transition-colors hover:text-primary">
                Home
              </a>
              <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-sm relative group transition-colors hover:text-primary">
                Features
              </a>
              <a href="#connect" onClick={(e) => handleScroll(e, 'connect')} className="text-sm relative group transition-colors hover:text-primary">
                Connect
              </a>
              <Link to="/about" className="text-sm relative group transition-colors hover:text-primary">
                About
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm font-semibold text-primary bg-gray-100 px-3 py-1 rounded-md">
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-sm font-medium text-gray-600 bg-gray-200 px-4 py-1 rounded-md hover:bg-gray-300 transition"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="text-sm">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
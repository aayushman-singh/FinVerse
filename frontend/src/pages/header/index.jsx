import React from "react";
import { Button } from "@/components/ui/button";
import { LineChart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LineChart className="h-6 w-6 text-[#1D4ED8]" /> {/* Navy blue color for financial theme */}
          <Link to="/" className="text-xl font-bold">FinVerse</Link>
        </div>
        
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-sm relative group transition-colors hover:text-primary">
            Home
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="/chatbot" className="text-sm relative group transition-colors hover:text-primary">
            Chatbot
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="/portfolio" className="text-sm relative group transition-colors hover:text-primary">
            Portfolio
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="#about" className="text-sm relative group transition-colors hover:text-primary">
            About
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <Link to="/addfunds" className="text-sm relative group transition-colors hover:text-primary">
            Add Funds
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
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

import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold">FinVerse</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link to="/chatbot" className="text-sm hover:text-primary transition-colors">Chatbot</Link>
          <Link to="/portfolio" className="text-sm hover:text-primary transition-colors">Portfolio</Link>
          <Link to="#about" className="text-sm hover:text-primary transition-colors">About</Link>
          <Link to="/addfunds" className="text-sm hover:text-primary transition-colors">Add Funds</Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">Log in</Button>
          <Button size="sm">Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export const AppHeader: React.FC = () => {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2 lg:gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cricket-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">CO</span>
          </div>
          <span className="font-semibold text-lg hidden md:inline-flex">Cricket Oracle</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Dashboard
          </Button>
        </Link>
        <Link to="/matches">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Matches
          </Button>
        </Link>
        <Link to="/bets">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Bets
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Settings
          </Button>
        </Link>
        <a
          href="https://github.com/your-repo/cricket-bet-oracle"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm">
            <Github className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">GitHub</span>
          </Button>
        </a>
      </div>
    </header>
  );
};

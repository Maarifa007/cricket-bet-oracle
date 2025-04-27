
import React from "react";
import { AppHeader } from "@/components/AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">{children}</main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        Cricket Bet Oracle &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

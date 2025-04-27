
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "success" | "error" | "pending" | "win" | "lose" | "push" | "cancelled" | "live" | "pregame" | "ended" | "completed" | "abandoned" | "tie";
  className?: string;
}

const statusMap: Record<StatusBadgeProps["status"], { label: string; className: string }> = {
  success: { label: "Success", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  error: { label: "Error", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  pending: { label: "Pending", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  win: { label: "Win", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  lose: { label: "Lose", className: "bg-red-100 text-red-800 hover:bg-red-100" },
  push: { label: "Push", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
  cancelled: { label: "Cancelled", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
  live: { label: "Live", className: "bg-cricket-accent text-white hover:bg-cricket-secondary animate-pulse-subtle" },
  pregame: { label: "Pre-Game", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
  ended: { label: "Ended", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
  completed: { label: "Completed", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  abandoned: { label: "Abandoned", className: "bg-gray-100 text-gray-800 hover:bg-gray-100" },
  tie: { label: "Tie", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { label, className: badgeClassName } = statusMap[status] || 
    { label: status, className: "bg-gray-100 text-gray-800" };

  return (
    <Badge variant="outline" className={cn(badgeClassName, className)}>
      {label}
    </Badge>
  );
};

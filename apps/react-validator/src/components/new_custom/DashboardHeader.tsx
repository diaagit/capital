import React from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const DashboardHeader = ({
  title,
  subtitle,
  icon,
  rightContent,
}: DashboardHeaderProps) => {
  return (
    <header className="border-b w-full border-border bg-background sticky top-0 z-10">
      <div className="h-16  px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          
          {icon && (
            <div className="flex items-center justify-center h-10 w-9 rounded-md bg-primary/10">
              {icon}
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xs text-muted-foreground leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightContent && (
          <div className="flex items-center gap-3">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
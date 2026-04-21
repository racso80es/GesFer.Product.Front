import * as React from "react";
import { cn } from "../../lib/utils/cn";

export interface SmartInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-testid'?: string;
  error?: string;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
  ({ className, type, error, icon, rightAction, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex flex-col gap-1.5">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 flex items-center justify-center text-muted-foreground pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring",
              "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground",
              error ? "border-destructive focus-visible:ring-destructive focus-visible:border-destructive" : "border-border hover:border-muted-foreground/30",
              icon && "pl-9",
              rightAction && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {rightAction && (
            <div className="absolute right-2 flex items-center justify-center">
              {rightAction}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-destructive font-medium m-0">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SmartInput.displayName = "SmartInput";

export { SmartInput };

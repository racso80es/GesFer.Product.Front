import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface AdaptiveDataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-testid'?: string;
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  asForm?: boolean;
}

const AdaptiveDataCard = React.forwardRef<HTMLDivElement, AdaptiveDataCardProps>(
  ({ className, title, description, headerAction, footer, asForm, children, ...props }, ref) => {

    // Si asForm es true, podemos aplicar ligeramente distinto padding o estructura si es necesario
    // Para esta PoC, la estructura base es similar pero mantenemos el flag para escalabilidad.
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground shadow-subtle overflow-hidden",
          className
        )}
        {...props}
      >
        {(title || description || headerAction) && (
          <div className="flex flex-col space-y-1.5 p-6 border-b border-border/50 bg-secondary/20">
            <div className="flex items-center justify-between">
              {title && (
                <h3 className="text-lg font-semibold leading-none tracking-tight text-foreground">
                  {title}
                </h3>
              )}
              {headerAction && (
                <div className="flex items-center space-x-2">
                  {headerAction}
                </div>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={cn("p-6", asForm && "space-y-4")}>
          {children}
        </div>

        {footer && (
          <div className="flex items-center p-6 pt-0 border-t border-border/50 bg-secondary/10 mt-4">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

AdaptiveDataCard.displayName = "AdaptiveDataCard";

export { AdaptiveDataCard };

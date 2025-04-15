import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border border-dark-border p-5 backdrop-blur-sm [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-5 [&>svg]:text-white shadow-md",
  {
    variants: {
      variant: {
        default: "bg-black bg-opacity-40 text-white",
        destructive:
          "border-red-800 bg-red-950 bg-opacity-60 text-red-200 [&>svg]:text-red-300",
        success: 
          "border-green-800 bg-green-950 bg-opacity-60 text-green-200 [&>svg]:text-green-300",
        warning:
          "border-yellow-800 bg-yellow-950 bg-opacity-60 text-yellow-200 [&>svg]:text-yellow-300",
        info:
          "border-blue-800 bg-blue-950 bg-opacity-60 text-blue-200 [&>svg]:text-blue-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-2 font-bold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full border-t-2 border-emerald-500 border-opacity-50 border-b-2 border-emerald-500 ${sizeClasses[size]}`}
      ></div>
    </div>
  )
}

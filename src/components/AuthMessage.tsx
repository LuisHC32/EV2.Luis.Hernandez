type AuthMessageProps = {
  type: "success" | "error" | null;
  text: string;
};

export function AuthMessage({ type, text }: AuthMessageProps) {
  if (!type || !text) return null;

  const className =
    type === "success"
      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
      : "border-rose-300 bg-rose-50 text-rose-900";

  return (
    <div className={`rounded-md border px-3 py-2 text-sm ${className}`} role="alert">
      {text}
    </div>
  );
}

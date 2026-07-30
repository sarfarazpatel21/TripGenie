export default function TagList({ items = [], variant = "default" }) {
  if (!items.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Nothing here yet.</p>;
  }

  const variantClasses = {
    default:
      "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span
          key={i}
          className={`text-sm px-3.5 py-1.5 rounded-full ${variantClasses[variant]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

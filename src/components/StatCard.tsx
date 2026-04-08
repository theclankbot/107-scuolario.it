interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5 text-center shadow-sm">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm font-medium text-text-secondary">{label}</p>
    </div>
  );
}

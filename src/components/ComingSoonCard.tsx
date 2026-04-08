interface ComingSoonCardProps {
  label: string;
}

export default function ComingSoonCard({ label }: ComingSoonCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-bg p-6 text-center">
      <span className="text-sm font-medium text-muted">{label}</span>
      <span className="mt-1 text-xs text-muted">Prossimamente</span>
    </div>
  );
}

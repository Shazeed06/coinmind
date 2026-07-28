type DataTableProps = {
  children: React.ReactNode;
};

export function DataTable({ children }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-border [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_th]:bg-bg-alt [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-text [&_th]:whitespace-nowrap [&_td]:p-3 [&_td]:border-t [&_td]:border-border [&_td]:text-text-muted [&_tr:hover_td]:bg-bg-alt/50">
      {children}
    </div>
  );
}

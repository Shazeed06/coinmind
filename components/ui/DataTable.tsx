type DataTableProps = {
  children: React.ReactNode;
};

export function DataTable({ children }: DataTableProps) {
  return (
    // Matches the .article-body table frame in globals.css so a table inside a
    // markdown review and a table inside a page body look like one component.
    <div className="overflow-x-auto rounded-card border border-line [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_th]:bg-bg-alt [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-text [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-line [&_td]:p-3 [&_td]:border-t [&_td]:border-line [&_td]:text-text-muted [&_tbody_tr:first-child_td]:border-t-0 [&_tr:hover_td]:bg-bg-alt">
      {children}
    </div>
  );
}

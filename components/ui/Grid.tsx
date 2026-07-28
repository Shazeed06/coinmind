type GridProps = {
  children: React.ReactNode;
  cols: 2 | 3 | 4 | 5 | 6;
  gap?: 24 | 32;
};

const colMap: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
};

export function Grid({ children, cols, gap = 24 }: GridProps) {
  return (
    <div className={`grid gap-6 lg:gap-${gap} ${colMap[cols]}`}>
      {children}
    </div>
  );
}

type GridProps = {
  children: React.ReactNode;
  cols: 2 | 3 | 4 | 5 | 6;
  gap?: 24 | 32;
};

const colMap: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
  6: "sm:grid-cols-2 lg:grid-cols-6",
};

export function Grid({ children, cols, gap = 24 }: GridProps) {
  return (
    <div className={`grid gap-${gap} ${colMap[cols]}`}>
      {children}
    </div>
  );
}

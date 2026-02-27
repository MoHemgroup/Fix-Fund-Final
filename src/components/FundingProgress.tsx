interface FundingProgressProps {
  funded: number;
  goal: number;
  showAmounts?: boolean;
  size?: "sm" | "md";
}

const FundingProgress = ({ funded, goal, showAmounts = true, size = "sm" }: FundingProgressProps) => {
  const percent = Math.min(Math.round((funded / goal) * 100), 100);
  const barHeight = size === "md" ? "h-3" : "h-2";

  return (
    <div>
      <div className={`w-full overflow-hidden rounded-full bg-muted ${barHeight}`}>
        <div
          className={`${barHeight} rounded-full transition-all duration-700 ${
            percent >= 100 ? "bg-success" : "bg-primary"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showAmounts && (
        <div className="mt-1.5 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-foreground">
            ${funded.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">
            of ${goal.toLocaleString()} ({percent}%)
          </span>
        </div>
      )}
    </div>
  );
};

export default FundingProgress;

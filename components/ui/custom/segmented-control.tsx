"use client";

export function SegmentedControl({
  value,
  onValueChange,
  options,
}: {
  value?: string; // allow undefined for deselection
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg border bg-muted p-1">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            type="button"
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={`
              flex-1 px-3 py-0.5 rounded-md cursor-pointer
              transition-colors duration-500 ease-in-out
              ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-background/80 hover:text-muted-foreground/90"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

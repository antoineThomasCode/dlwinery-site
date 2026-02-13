interface PlaceholderAssetProps {
  label: string;
  aspectRatio?: string;
  className?: string;
}

export function PlaceholderAsset({ label, aspectRatio = "16/9", className = "" }: PlaceholderAssetProps) {
  return (
    <div
      className={`relative bg-stone/10 border-2 border-dashed border-stone/30 flex items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      <div className="text-center p-4">
        <div className="text-stone/50 text-sm font-medium mb-1">Asset manquant</div>
        <div className="text-stone/40 text-xs">{label}</div>
      </div>
    </div>
  );
}

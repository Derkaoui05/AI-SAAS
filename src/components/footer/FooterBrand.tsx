import { ChefHat } from 'lucide-react';

export function FooterBrand() {
  return (
    <div className="flex items-center gap-3">
      <ChefHat className="h-9 w-9 text-emerald-600" />
      <span className="text-xl font-semibold tracking-tight">PurePLate</span>
    </div>
  );
}

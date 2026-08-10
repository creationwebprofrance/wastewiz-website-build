import { ShieldAlert } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="w-full bg-primary text-primary-foreground">
      <div className="container flex items-center justify-center py-2 px-4">
        <p className="text-xs sm:text-sm font-medium text-center leading-snug flex items-center gap-2 flex-wrap justify-center">
          <ShieldAlert className="h-4 w-4 text-secondary shrink-0" />
          <span>
            WasteWhiz never asks for payment before the work is completed — beware of fraud.
            We operate <strong className="font-semibold text-secondary">only</strong> in Manchester & Greater Manchester.
          </span>
        </p>
      </div>
    </div>
  );
}

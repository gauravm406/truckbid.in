import { cn } from "@/lib/utils";

export default function Logo({ className }: { className: string }) {
  return (
    <h3 className={cn("text-4xl font-bold text-gray-800", className)}>
      Truckbid
    </h3>
  );
}

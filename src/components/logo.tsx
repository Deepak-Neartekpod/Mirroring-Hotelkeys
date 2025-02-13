import { Hotel } from "lucide-react";

export function Logo() {
  return (
    <div className="relative flex h-8 max-w-[10.847rem] items-center space-x-2">
      <Hotel className="h-6 w-6 text-gray-800" />
      <h1 className="text-xl font-bold text-gray-800">PMS</h1>
    </div>
  );
}

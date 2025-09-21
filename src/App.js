import React from "react";
import {
  Shirt,
  WashingMachine,
  Plus,
  Trash,
  CheckCircle,
} from "lucide-react";

const LaundryItem = ({ item, onAdd, onRemove, onMarkWorn }) => {
  // Example category color function
  const getCategoryColor = (category) => {
    switch (category) {
      case "Shirts":
        return "bg-blue-100 text-blue-800";
      case "Pants":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white shadow-sm border">
      {/* Left section: icon + text */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Shirt className="w-8 h-8 text-slate-500" />
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-slate-800 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-slate-500 truncate">
            {item.status || "Worn"}
          </p>
        </div>
      </div>

      {/* Badge */}
      <div
        className={`px-2 py-0.5 rounded-full text-xs font-semibold mt-2 sm:mt-0 ${getCategoryColor(
          item.category
        )}`}
      >
        {item.category || "Uncategorized"}
      </div>

      {/* Buttons */}
      <div className="flex flex-row sm:flex-row gap-2 mt-2 sm:mt-0">
        <button
          onClick={onAdd}
          className="flex items-center justify-center px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={onMarkWorn}
          className="flex items-center justify-center px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
        >
          <CheckCircle size={16} />
        </button>
        <button
          onClick={onRemove}
          className="flex items-center justify-center px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default LaundryItem;

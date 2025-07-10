interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const colors = [
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Green", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Gray", value: "#6b7280" },
  { name: "Slate", value: "#64748b" },
];

export default function ColorPicker({
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Choose Column Color
      </h3>
      <div className="grid grid-cols-6 gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            type="button"
            onClick={() => onColorChange(color.value)}
            className={`w-10 h-10 rounded-2xl border-3 transition-all duration-200 hover:scale-110 ${
              selectedColor === color.value
                ? "border-white shadow-lg"
                : "border-transparent shadow-sm hover:shadow-md"
            }`}
            style={{
              backgroundColor: color.value,
              boxShadow:
                selectedColor === color.value
                  ? `0 0 0 2px white, 0 0 0 4px ${color.value}40, 0 4px 8px rgba(0,0,0,0.15)`
                  : "0 2px 4px rgba(0,0,0,0.1)",
            }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}

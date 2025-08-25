interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const colors = [
  { name: 'red', class: 'bg-red-500' },
  { name: 'orange', class: 'bg-orange-500' },
  { name: 'yellow', class: 'bg-yellow-500' },
  { name: 'green', class: 'bg-green-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'indigo', class: 'bg-indigo-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'pink', class: 'bg-pink-500' },
  { name: 'gray', class: 'bg-gray-500' },
]

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onColorChange(color.name)}
          className={`w-10 h-10 rounded-full ${color.class} border-2 transition-all duration-200 ${
            selectedColor === color.name
              ? 'border-white scale-110 shadow-lg'
              : 'border-gray-500 hover:border-gray-300 hover:scale-105'
          }`}
          title={`Select ${color.name} color`}
        />
      ))}
    </div>
  )
}

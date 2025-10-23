import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface CollapsibleSectionProps {
    title: string;
    icon: LucideIcon;
    items: string[];
    onAdd: () => void;
    onRemove: (item: string) => void;
    newItem: string;
    setNewItem: (value: string) => void;
    placeholder: string;
    color: string;
}

export default function CollapsibleSection({
    title,
    icon: Icon,
    items,
    onAdd,
    onRemove,
    newItem,
    setNewItem,
    placeholder,
    color
}: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <button onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-750 transition-colors">
                <div className="flex items-center gap-2">
                    <Icon size={18} className={color} />
                    <span className="font-medium text-sm">{title}</span>
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                        {items.length}
                    </span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="px-4 pb-4 pt-2">
                    <div className="flex gap-2 mb-3">
                        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onAdd()} placeholder={placeholder} className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors" />
                        <button onClick={onAdd} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">+</button>
                    </div>

                    {items.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 text-xs">
                            Nenhum item adicionado
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-lg group hover:bg-gray-850 transition-colors">
                                    <span className="text-xs truncate flex-1 mr-2">{item}</span>
                                    <button onClick={() => onRemove(item)} className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
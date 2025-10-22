interface ModernToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function ModernToggle({ checked, onChange }: ModernToggleProps) {
    return (
        <button onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-green-500" : "bg-gray-600"}`}
        >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0"}`}
            />
        </button>
    );
}
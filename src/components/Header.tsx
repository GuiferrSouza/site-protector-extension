import { Shield, CheckCircle2, AlertCircle } from "lucide-react";
import ModernToggle from "./ModernToggle";

interface HeaderProps {
    protectionEnabled: boolean;
    onToggle: (checked: boolean) => void;
}

export default function Header({ protectionEnabled, onToggle }: HeaderProps) {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Shield size={24} className="text-white" />
                    <h1 className="text-lg font-bold">Site Protector</h1>
                </div>
                <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${protectionEnabled
                            ? "bg-green-500 bg-opacity-20 text-green-300"
                            : "bg-red-500 bg-opacity-20 text-red-300"
                        }`}
                >
                    {protectionEnabled ? "Ativo" : "Inativo"}
                </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`p-2 rounded-lg ${protectionEnabled ? "bg-green-500 bg-opacity-20" : "bg-gray-700"
                            }`}
                    >
                        {protectionEnabled ? (
                            <CheckCircle2 size={20} className="text-green-300" />
                        ) : (
                            <AlertCircle size={20} className="text-gray-400" />
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-sm">Proteção Ativa</p>
                        <p className="text-xs text-gray-300 opacity-80">
                            {protectionEnabled ? "Sites protegidos" : "Proteção desativada"}
                        </p>
                    </div>
                </div>
                <ModernToggle checked={protectionEnabled} onChange={onToggle} />
            </div>
        </div>
    );
}
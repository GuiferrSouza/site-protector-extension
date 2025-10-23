interface FooterProps { totalRules: number }

export default function Footer({ totalRules }: FooterProps) {
    return (
        <div className="border-t border-gray-800 px-4 py-3 bg-gray-850">
            <div className="flex justify-between text-xs text-gray-400">
                <span>Rules: {totalRules}</span>
            </div>
        </div>
    );
}
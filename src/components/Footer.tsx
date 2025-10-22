interface FooterProps {
    totalRules: number;
    allowedSites: number;
}

export default function Footer({ totalRules, allowedSites }: FooterProps) {
    return (
        <div className="border-t border-gray-800 px-4 py-3 bg-gray-850">
            <div className="flex justify-between text-xs text-gray-400">
                <span>Total rules: {totalRules}</span>
                <span>Allowed: {allowedSites}</span>
            </div>
        </div>
    );
}
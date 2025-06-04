
export const InterestRateField = ({ interests, isEditing, handleInterestChange, isDiff = false }) => {
    const namesInteres = {
        vis: "VIS",
        no_vis: "NO VIS",
        vis_uvr: "VIS UVR",
        no_vis_uvr: "NO VIS UVR",
        no_vis_100: "NO VIS: Entre $100M / $200M",
        no_vis_200: "NO VIS: Superior a $200M",
        used_vis: "USADO VIS",
        used_no_vis: "USADO NO VIS",
        used_vis_uvr: "USADO VIS UVR",
        used_no_vis_uvr: "USADO NO VIS UVR",
        no_vis_uvr_100: "NO VIS UVR: Entre $100M / $200M",
        no_vis_uvr_200: "NO VIS UVR: Superior a $200M"
    };
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-2">
            {Object.entries(interests).map(([key, value]) => (
                <div key={key} className="space-y-1">
                    <label htmlFor={`${isDiff ? 'diff-' : ''}${key}`} className="block text-[14px] font-medium text-gray-700">
                        {namesInteres[key]}
                    </label>
                    {isEditing ? (
                        <div className="relative">
                            <input
                                type="number"
                                id={`${isDiff ? 'diff-' : ''}${key}`}
                                value={value === 0 ? '' : value}
                                required
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    handleInterestChange(key, newValue === '' ? 0 : parseFloat(newValue) || 0, isDiff);
                                }}
                                step="0.1"
                                className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azure-500 focus:border-azure-500"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">{value % 1 === 0 ? Math.round(value) : isNaN(value) ? 0 : value}%</span>
                        </div>
                    ) : (
                        <p className="p-2 bg-gray-100 rounded-md text-sm">{value % 1 === 0 ? Math.round(value) : value}%</p>
                    )}
                </div>
            ))}
        </div>
    )
}

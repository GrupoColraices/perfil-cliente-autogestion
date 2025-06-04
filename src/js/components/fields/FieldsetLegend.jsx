import React from 'react'

export const FieldsetLegend = ({ children }) => {
    return (
        <legend className="absolute top-3 left-0 right-0 w-full flex justify-center items-center gap-8 text-center text-azure-700 font-semibold text-lg">
            <div className="w-8 h-[1.6px] bg-gold-400 rounded"></div>
            {children}
            <div className="w-8 h-[1.6px] bg-gold-400 rounded"></div>
        </legend>
    )
}

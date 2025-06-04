import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const GoBackButton = ({ link = '/', label = 'Atrás', goBack = false }) => {
    const navigate = useNavigate()
    if (goBack) {
        return (
            <div className="flex items-center max-w-fit text-azure-700 font-bold text-sm hover:text-gold-500  transition-all hover:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12l10 0" />
                    <path d="M10 12l4 4" />
                    <path d="M10 12l4 -4" />
                    <path d="M4 4l0 16" />
                </svg>
                <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                    Atrás
                </span>
            </div>
        )
    }
    return (
        <Link
            to={link}
            className="flex items-center max-w-fit text-azure-700 font-bold text-sm hover:text-gold-500  transition-all hover:[text-shadow:_0_1px_4px_rgb(0_0_0_/_40%)]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12l10 0" />
                <path d="M10 12l4 4" />
                <path d="M10 12l4 -4" />
                <path d="M4 4l0 16" />
            </svg>
            {label}
        </Link>
    )
}

import { Link } from 'react-router-dom'

export const StatCard = ({ content = {}, count = 0, active = false }) => {
    return (
        <article
            className={`mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4 hover:scale-105 transition-transform ${
                !active && 'opacity-30 hover:transform-none'
            }`}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-azure-50 rounded mb-3 xl:mb-0 shadow-lg ">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">{content.label}</h5>
                            <span className="font-semibold text-xl text-blueGray-700">{count}</span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-gold-300">
                                <svg className="w-6 h-6" dangerouslySetInnerHTML={{ __html: content.icon }}></svg>
                            </div>
                        </div>
                    </div>
                    <Link to={content.url} className="text-sm text-blueGray-400 mt-4 flex gap-2 items-center">
                        <span className="whitespace-nowrap text-azure-600"> Ver más </span>
                        <span className="text-azure-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export const Loader = ({ label = 'Cargando...' , progress}) => {
    return (
        <div className="loader">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>{label}</span>
            {typeof progress === 'number' && (
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="progress-percent">{progress}%</span>
                </div>
            )}
        </div>
    )
}

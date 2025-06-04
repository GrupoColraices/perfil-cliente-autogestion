import { useState, useEffect, useCallback } from 'react';

export const Timer = ({ initialTime = 60, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    const tick = useCallback(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
                if (onComplete) onComplete();
                return 0;
            }
            return prevTime - 1;
        });
    }, [onComplete]);

    useEffect(() => {
        if (timeLeft === 0) return;
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft, tick]);

    return (
        <p className='text-[13px] text-azure-600 px-2'>{`Podrá reenviar el código en: ${timeLeft} segundos`}</p>
    );
};



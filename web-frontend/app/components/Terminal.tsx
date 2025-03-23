import React, { useEffect, useRef } from 'react';

const Terminal: React.FC<{ output: string }> = ({ output }) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    return (
        <div
            ref={terminalRef}
            style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px',
                height: '300px',
                overflowY: 'scroll',
                borderRadius: '5px',
                fontFamily: 'monospace',
            }}
        >
            {output}
        </div>
    );
};

export default Terminal; 
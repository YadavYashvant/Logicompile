import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { FitAddon } from 'xterm-addon-fit';

const CustomTerminal: React.FC<{ output: string }> = ({ output }) => {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xterm = useRef<Terminal | null>(null);
    const fitAddon = useRef<FitAddon | null>(null);

    useEffect(() => {
        if (terminalRef.current) {
            xterm.current = new Terminal({
                cursorBlink: true,
                theme: {
                    background: '#000',
                    foreground: '#fff',
                },
            });

            fitAddon.current = new FitAddon();
            xterm.current.loadAddon(fitAddon.current);
            xterm.current.open(terminalRef.current);
            fitAddon.current.fit();

            // Output the initial content
            xterm.current.write(output);

            // Resize the terminal on window resize
            window.addEventListener('resize', () => {
                fitAddon.current?.fit();
            });
        }

        return () => {
            window.removeEventListener('resize', () => {
                fitAddon.current?.fit();
            });
            xterm.current?.dispose();
        };
    }, []);

    useEffect(() => {
        if (xterm.current) {
            xterm.current.clear();
            xterm.current.write(output);
        }
    }, [output]);

    return (
        <div
            ref={terminalRef}
            style={{ width: '100%', height: '300px', borderRadius: '5px', overflow: 'hidden' }}
        />
    );
};

export default CustomTerminal; 
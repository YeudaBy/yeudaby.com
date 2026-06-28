import {useEffect, useState} from "react";
import {commands} from "../CommandManager.ts";
import "../index.css"



export const TerminalWindow = () => {
    const [os, setOs] = useState<'linux' | 'windows'>()
    const [lines, setLines] = useState<string[]>([])
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        if (userAgent.includes('mac os') || userAgent.includes('linux')) {
            setOs('linux')
        } else if (userAgent.includes('win')) {
            setOs('windows')
        }
    }, []);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLines(prev => [...prev, `$ ${input}`]);
        const [command, ...args] = input.split(' ');
        for (const cmdKey in commands) {
            const cmd = commands[cmdKey as keyof typeof commands];
            if ((os == 'windows' && cmd.win === command) ||
                (os == 'linux' && cmd.linux === command)) {
                const output = cmd.execute(args.join(' '));
                setLines(prev => [...prev, ...output || [ `Executed command: ${input}`]]);
            }
        }
        setInput('');
    }

    return <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'monospace',
        padding: '1rem',
        boxSizing: 'border-box',
        // display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    }}>
        <div style={{flex: 1, overflowY: 'auto'}}>
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
        <form onSubmit={onSubmit} style={{
            display: 'flex',
            gap: '8px'
        }}>
            <span style={{
                color: 'lightgreen',
            }}>{"$ >"}</span>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    outline: 'none',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    width: '300px'
                }}
                autoFocus
            />
        </form>
    </div>
}

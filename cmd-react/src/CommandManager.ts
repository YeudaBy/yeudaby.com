export const CommandManager = {
    getList(path: string): string[] {
        // Dummy implementation for demonstration purposes
        return ['command1', 'command2', 'command3'];
    },
    changeDirectory(path: string): void {
        // Dummy implementation for demonstration purposes
        console.log(`Changed directory to: ${path}`);
    }
}

export const commands = {
    "dir": {
        win: 'dir',
        linux: 'ls',
        description: "List directory contents",
        execute: (path: string) => CommandManager.getList(path)
    },
    "cd": {
        win: 'cd',
        linux: 'cd',
        description: "Change directory",
        execute: (path: string) => CommandManager.changeDirectory(path)
    },
    "help": {
        win: 'help',
        linux: 'help',
        description: "Show help information",
        execute: () => [
            "Available commands:",
            "dir - List directory contents",
            "cd - Change directory",
            "help - Show help information"
        ]
    },
    "whoami": {
        win: 'whoami',
        linux: 'whoami',
        description: "Show current user",
        execute: () => ["User: Guest"]
    },
    'cls': {
        win: 'cls',
        linux: 'clear',
        description: "Clear the screen",
        execute: () => []
    },
    'exit': {
        win: 'exit',
        linux: 'exit',
        description: "Exit the terminal",
        execute: () => {
            window.close();
            return [];
        }
    },
    'date': {
        win: 'date /T',
        linux: 'date',
        description: "Show current date and time",
        execute: () => [new Date().toString()]
    },
    'echo': {
        win: 'echo',
        linux: 'echo',
        description: "Display a line of text",
        execute: (text: string) => [text]
    }
}

import { app, BrowserWindow } from 'electron';
import startExpressServer from './app/index.js';

const PORT = 3000;
let mainWindow;

// Function to create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Load the app served by the Express server
    mainWindow.loadURL(`http://localhost:${PORT}`);

    // Uncomment to open DevTools for debugging
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Start the Express server
startExpressServer(PORT);

// Event handlers for Electron lifecycle
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

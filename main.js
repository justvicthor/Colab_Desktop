// main.js
const { app, BrowserWindow, Menu, shell, nativeTheme } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'icon', 'colab_go.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      zoomFactor: 1.0
    }
  });

  mainWindow = win;

  // Carica Google Colab
  win.loadURL('https://colab.research.google.com');

  // Apri link esterni nel browser di sistema
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Crea menu con funzionalità zoom e dark mode
  const template = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+numadd',
          click: () => {
            const currentZoom = win.webContents.getZoomFactor();
            win.webContents.setZoomFactor(Math.min(currentZoom + 0.1, 3.0));
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            const currentZoom = win.webContents.getZoomFactor();
            win.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.5));
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            win.webContents.setZoomFactor(1.0);
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Dark Mode',
          accelerator: 'CmdOrCtrl+Shift+D',
          click: () => {
            if (nativeTheme.shouldUseDarkColors) {
              nativeTheme.themeSource = 'light';
            } else {
              nativeTheme.themeSource = 'dark';
            }
          }
        },
        {
          label: 'System Theme',
          click: () => {
            nativeTheme.themeSource = 'system';
          }
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            win.reload();
          }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'F12',
          click: () => {
            win.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            win.close();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Gestori aggiuntivi per tutte le scorciatoie da tastiera
  win.webContents.on('before-input-event', (event, input) => {
    const isCtrlOrCmd = input.control || input.meta;
    
    if (isCtrlOrCmd) {
      // Zoom In: Ctrl/Cmd + = o +
      if (input.key === '=' || input.key === '+') {
        const currentZoom = win.webContents.getZoomFactor();
        win.webContents.setZoomFactor(Math.min(currentZoom + 0.1, 3.0));
        return;
      }
      
      // Zoom Out: Ctrl/Cmd + -
      if (input.key === '-') {
        const currentZoom = win.webContents.getZoomFactor();
        win.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.5));
        return;
      }
      
      // Reset Zoom: Ctrl/Cmd + 0
      if (input.key === '0') {
        win.webContents.setZoomFactor(1.0);
        return;
      }
      
      // Reload: Ctrl/Cmd + R
      if (input.key === 'r' || input.key === 'R') {
        win.reload();
        return;
      }
      
      // Toggle Dark Mode: Ctrl/Cmd + Shift + D
      if ((input.key === 'd' || input.key === 'D') && input.shift) {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light';
        } else {
          nativeTheme.themeSource = 'dark';
        }
        return;
      }
      
      // Close App: Ctrl/Cmd + W
      if (input.key === 'w' || input.key === 'W') {
        win.close();
        return;
      }
    }
    
    // Toggle DevTools: F12
    if (input.key === 'F12') {
      win.webContents.toggleDevTools();
      return;
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Su macOS è comune mantenere l’app aperta finché l’utente non chiude esplicitamente
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  // Su macOS riapri la finestra se l’utente clicca sull’icona
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

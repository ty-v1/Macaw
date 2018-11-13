'use strict';

import {
    app,
    BrowserWindow,
    dialog,
    Menu,
    MenuItem,
    MenuItemConstructorOptions,
    OpenDialogOptions,
    protocol
} from 'electron';
import {createProtocol, installVueDevtools} from 'vue-cli-plugin-electron-builder/lib';
import fs from "fs-extra";
import {Channel} from "@/scripts/ipc/Channel";

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: Electron.BrowserWindow | null;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

// レンダラプロセスに読み込んだデータを送信する
function readFile(filePaths: string[], bookmarks: string[]): void {
    const filePath: string = filePaths[0];
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        } else if (win !== null) {
            win.webContents.send(Channel.FILE_READ, data);
        }
    });
}

// メニューのセットアップ
const OPEN_DIALOG_OPTIONS: OpenDialogOptions = {
    title: 'Import JSON File',
    defaultPath: app.getPath('home'),
    filters: [
        {name: 'JSON File', extensions: ['json']}
    ],
    properties: ['openFile']
};

function createMenu(): void {
    // ElectronのMenuのテンプレート
    const menuTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'import',
                    click(item: MenuItem, window: BrowserWindow) {
                        dialog.showOpenDialog(window, OPEN_DIALOG_OPTIONS, readFile);
                    }
                },
                {
                    role: 'redo',
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'reload',
                    click(item: MenuItem, window: BrowserWindow) {
                        if (window) {
                            window.reload()
                        }
                    },
                },
                {
                    label: 'change style',
                },
                {
                    role: 'resetzoom',
                },
                {
                    role: 'zoomin',
                },
                {
                    role: 'zoomout',
                },
                {
                    role: 'togglefullscreen',
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}


function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});
    createMenu();

    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadFile('index.html');
    }

    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        await installVueDevtools();
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    process.on('message', data => {
        if (data === 'graceful-exit') {
            app.quit();
        }
    });
}

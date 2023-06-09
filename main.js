const { app, shell, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const userDataPath = app.getPath('userData');
const windowSizeFilePath = path.join(userDataPath, 'window-size.json');
const tgcFilePath = path.join(userDataPath, 'cfg.json');

let mainWindow;
let appTray;
let wtitle = 'ONIX MEDIA';
let wicon = 'res/icon.png';
let gh = 'res/gh.png';
let realclose = false;

const themeScript = require('./theme.js');
const CCScript = require('./centerchat.js');
const SBScript = require('./sidebar.js');


const cfgval = loadTGC() || { tgc : 0 , swl : 0, dcc : 0, smb : 1 };
	console.log( cfgval );
const wmenu = 
[
{
label: 'File',
submenu: 
[
	{
	label: 'ONIX MEDIA | CORE',
	accelerator: 'CmdOrCtrl+Alt+Shift+K',
	click: () => {
		console.log("Switching to ONIX MEDIA | CORE...");
		mainWindow.setTitle("ONIX MEDIA | CORE");
		mainWindow.loadFile('./index.html'); 
		cfgval.tgc = 1;
		saveTGC(); 
	}
	},
	{
	label: 'PhotoPrism',
	accelerator: 'CmdOrCtrl+Alt+Shift+A',
	click: () => 
	{
		console.log("Switching to PhotoPrism...");
		mainWindow.setTitle("Switching to PhotoPrism...");
		mainWindow.loadURL('http://photoprism.me:2342'); 
		// cfgval.tgc = 2;
		// saveTGC(); 
	}
	},
	{
	label: 'Telegram',
	accelerator: 'CmdOrCtrl+Alt+Shift+A',
	click: () => 
	{
		console.log("Switching to Telegram...");
		mainWindow.setTitle("Switching to Telegram...");
		mainWindow.loadURL('https://web.telegram.org/a'); 
		cfgval.tgc = 0;
		saveTGC(); 
	}
	},
	{ type: 'separator' },
	{
	label: 'Exit',
	accelerator: 'CmdOrCtrl+Q',
	click: () => 
	{
		realclose = 1;
		app.quit();
	}
	}
]
},

{
label: 'Edit',
submenu: 
	[
	{ label: 'undo' },
	{ role: 'redo' },
	{ type: 'separator' },
	{ role: 'cut' },
	{ role: 'copy' },
	{ role: 'paste' },
	{ role: 'pasteAndMatchStyle', label: 'Paste Unformatted' },
	{ role: 'delete' },
	{ type: 'separator' },
	{ role: 'selectAll' }
	]
},

{
label: 'View',
submenu:
	[
	{ role: 'reload' },
	{ role: 'forcereload' },
	{ type: 'separator' },
	{ role: 'zoomin' },
	{ role: 'zoomout' },
	{ role: 'resetzoom', label: 'Default Zoom' },
	{ type: 'separator' },
	]
},

{
label: 'Window',
submenu: 
	[
	{
	label: 'Maximize/Restore',
	accelerator: 'CmdOrCtrl+Shift+M',
	click: () => 
	{
		if (mainWindow.isMaximized()) 
		{
			mainWindow.restore()
		} 
		else 
		{
			mainWindow.maximize()
		}
	}
	},

	{ role: 'minimize' },
	{
	label: 'Hide Menubar',
	accelerator: 'Alt+T',
	click: () => 
	{
		if (mainWindow.isMenuBarVisible()) 
		{
			mainWindow.setMenuBarVisibility(false);
			cfgval.smb = 0;
			saveTGC();
		} 
		else 
		{
			mainWindow.setMenuBarVisibility(true);
			cfgval.smb = 1;
			saveTGC();
		}
	}
	},
	{ role: 'togglefullscreen' },
	{ type: 'separator' },
	{
	label: 'Hide to Tray',
	accelerator: 'CmdOrCtrl+Shift+H',
	click: () => 
	{
		mainWindow.hide();
	}
	}
	]
},

{
label: 'Tools',
submenu: 
[
{
	label: 'Extra Options',
	submenu: 
	[
		{
		label: 'Toggle Sidebar Width Limit',
		click: () => {
		if (cfgval.swl === 0) 
		{
			cfgval.swl = 1;
			SidebarByPass()
			mainWindow.webContents.reload();
			saveTGC()
		} 
		else 
		{
			cfgval.swl = 0;
			mainWindow.webContents.reload();
			saveTGC()
		}
		}
		},
		{
		label: 'Toggle Center Chat',
		click: () => {
		if (cfgval.dcc === 0) 
		{
			cfgval.dcc = 1;
			CenterChat()
			mainWindow.webContents.reload();
			saveTGC()
		} 
		else 
		{
			cfgval.dcc = 0;
			mainWindow.webContents.reload();
			saveTGC()
		}
		}
		},
		{
		label: 'Toggle Center Chat',
		click: () => {
		if (cfgval.dcc === 0) 
		{
			cfgval.dcc = 1;
			CenterChat()
			mainWindow.webContents.reload();
			saveTGC()
		} 
		else 
		{
			cfgval.dcc = 0;
			mainWindow.webContents.reload();
			saveTGC()
		}
		}
		},
	]
	},
	{
	label: 'Text Speeching                      ',
	sublabel: '(not implemented yet)',
	submenu: 
	[
	{ role: 'startSpeaking' },
	{ role: 'stopSpeaking' }
	]
	},

	{
	label: 'Translate',
	sublabel: '(not implemented yet)',
	submenu: 
	[
	{
	label: 'Translate selected text',
	click: () => 
	{
		shell.openExternal('https://www.example.com');
	}
	},
	{
	label: 'Select Target',
	click: () => 
	{
		shell.openExternal('https://www.example.com');
	}
	},
	]
	},
	{ type: 'separator' },
	{ role: 'toggledevtools', label: 'Developer Tools'  },
	
]

},

{
label: 'Help',
submenu: 
[
	{
	label: 'About Selegram Client',
	icon: 'res/icon32.png',
	submenu: 
	[
		{
		label: 'WebPage                      ',
		icon: 'res/icon32.png',
		sublabel: 'itzselenux.github.io',
		click: () => 
		{
			shell.openExternal('https://itzselenux.github.io/selegram');
		}
		},
		{
		label: 'Source Code',
		sublabel: 'ItzSelenux/selegram',
		icon: gh,
		click: () => {
			shell.openExternal('https://github.com/ItzSelenux/selegram');
		}
		},
		{
		label: 'Issues',
		icon: gh,
		click: () => 
		{
			shell.openExternal('https://github.com/ItzSelenux/selegram/issues');
		}
		}
	]
	},
	{
	label: 'About Telegram',
	icon: 'res/tg.png',
	submenu: [
		{
		label: 'Telegram WebSite',
		icon: 'res/tg.png',
		click: () => {
			shell.openExternal('https://telegram.org');
		}
		},
		{
		label: 'Telegram A source code',
		icon: 'res/tga.png',
		click: () => 
		{
			shell.openExternal('https://github.com/Ajaxy/telegram-tt');
		}
		},
		{
		label: 'Telegram K source code',
		icon: 'res/tgk.png',
		click: () => {
			shell.openExternal('https://github.com/morethanwords/twebg');
		}
		}
	]
	},
	{
	label: 'About Electron',
	icon: 'res/electron.png',
	tooltip: 'https://itzselenux.github.io/selegram',
	click: () => 
	{
		shell.openExternal('https://www.electronjs.org');
	}
	},
	{ type: 'separator' }
]
}
];
module.exports = wmenu;

const menu = Menu.buildFromTemplate(wmenu);

//Load/Save Config Items
/*
 tgc: TeleGram Client, 0 = Telegram A, 1 = Telegram K
 swl: Sidebar Width Limit
 dcc: Disable Center Chat
 smb: Show Menu Bar
 * */

function saveTGC() {
  const cfg = { tgc: cfgval.tgc, swl: cfgval.swl, dcc: cfgval.dcc, smb: cfgval.smb };
  fs.writeFileSync(tgcFilePath, JSON.stringify(cfg));
  console.log( "Configuration Saved: " ); console.log( cfgval );
}

function loadTGC() 
{
try 
{
	const TGC = JSON.parse(fs.readFileSync(tgcFilePath));
	return TGC;
} 
catch (error) 
{
	console.log( "Configuration File doesn't exist, using default parameters" );
	return null;
}
}


function CenterChat() {
	  const ccscript = CCScript(); // Call the exported function to get the script
  mainWindow.webContents.executeJavaScript(ccscript);
}

function SidebarByPass() {
	  const sbscript = SBScript(); // Call the exported function to get the script
  mainWindow.webContents.executeJavaScript(sbscript);
}
//Main Window
////////////////////////////////////////////////////////
function saveWindowSize() 
{
if (!mainWindow) return;
const { width, height } = mainWindow.getBounds();
const windowSize = { width, height };
fs.writeFileSync(windowSizeFilePath, JSON.stringify(windowSize));
}

function loadWindowSize() 
{
try 
{
	const windowSize = JSON.parse(fs.readFileSync(windowSizeFilePath));
	return windowSize;
} 
catch (error) 
{
	return null;
}
}

//MainWindow behavior
function createWindow() 
{
	const windowSize = loadWindowSize() || { width: 666, height: 696 };
	mainWindow = new BrowserWindow
	({
	width: 1440,
	height: 920,
	resizable: false,
		icon: path.join(__dirname, wicon),
		webPreferences:
		{
			nodeIntegration: true 
			
			
		},
		title: wtitle 
	});


if (cfgval.tgc === 1) 
{
	mainWindow.loadFile('./index.html');
	console.log("ONIX MEDIA | CORE");
} 
else if (cfgval.tgc === 0) 
{
	mainWindow.loadURL('https://web.telegram.org/a');
	console.log("Telegram");
}

	mainWindow.on('closed', () => 
	{
		mainWindow = null;
	});

mainWindow.webContents.on('did-finish-load', () => 
{
	if (cfgval.tgc === 0)
	mainWindow.setTitle( wtitle + " | Telegram");
	else
	mainWindow.setTitle( wtitle + " | CORE");
});



//change visual settings
mainWindow.webContents.on('did-finish-load', () =>  
{
	if (cfgval.dcc === 0)
	{
	;
	}
	else
	{
	 CenterChat();	
	}
});

//change visual settings
mainWindow.webContents.on('did-finish-load', () =>  
{
	if (cfgval.swl === 0)
	{
	;
	}
	else
	{
	 SidebarByPass();	
	}
});

mainWindow.on('resize', saveWindowSize);

mainWindow.on('closed', () => 
{
	mainWindow = null; // Reset the reference to the window
});



	//Send to tray instead of closing like on TDesktop
	mainWindow.on('close', (event) => 
{
	if (realclose) 
	{
	// Quit the app if realclose is true
		mainWindow = null;
	}
	else 
	{
	// Hide the window instead of closing it
		event.preventDefault();
		mainWindow.hide();
	}
});
	Menu.setApplicationMenu(null)
	Menu.setApplicationMenu(menu);

if (cfgval.smb === 0)
{
mainWindow.setMenuBarVisibility(false);
}

}

//On Execution things like tray, or handle links
////////////////////////////////////////////////////////
app.whenReady().then(() => 
{
createWindow();



// Create a tray icon
const trayIconPath = path.join(__dirname, wicon);
appTray = new Tray(trayIconPath);

// Create a context menu for the tray icon
const contextMenu = Menu.buildFromTemplate
([
{
	label: 'Show Onix Media | CORE',
	click: () => 
	{
		// realclose = 1;
		mainWindow.show();
	}
},
{
	label: 'Quit Onix Media | CORE',
	click: () => 
	{
		realclose = 1;
		app.quit();
	}
}
]);


// Set the tray icon's context menu
appTray.setContextMenu(contextMenu);

// Show the window when the tray icon is clicked
appTray.on('click', () => 
	{
	if (mainWindow.isVisible()) 
	{
		mainWindow.hide();
	} 
	else 
	{
		mainWindow.show();
	}
	});
});


//Trash Stuff for basic functionality
////////////////////////////////////////////////////////
app.on('window-all-closed', function() 
{
if (process.platform !== 'darwin') 
{
	app.quit();
}
});

app.on('activate', function() 
{
if (mainWindow === null) 
{
	createWindow();
}
});


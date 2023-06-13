const { shell } = require('electron');

function openURL(url) {
    shell.openExternal(url);
    }
  
  // Example usage:
  openURL('https://auth.monday.com/auth/login_monday/');


// postinstall.js
const { exec } = require('child_process');
const os = require('os');

const platform = os.platform();

if (platform === 'win32') {
  // Remove Linux-specific package on Windows
  exec('npm uninstall @next/swc-linux-x64-gnu', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error removing @next/swc-linux-x64-gnu: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
} else {
  // Remove Windows-specific package on non-Windows platforms
  exec('npm uninstall @next/swc-win32-x64-msvc', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error removing @next/swc-win32-x64-msvc: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

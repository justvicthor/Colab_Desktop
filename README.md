# 🚀 Colab Desktop

A modern desktop wrapper for Google Colab built with Electron, providing a native app experience with enhanced features and keyboard shortcuts.

![Colab Desktop](icon/colab_go.png)

## ✨ Features

### 🔍 **Zoom Controls**
- **Zoom In**: `Ctrl/Cmd + +` or `Ctrl/Cmd + =`
- **Zoom Out**: `Ctrl/Cmd + -`
- **Reset Zoom**: `Ctrl/Cmd + 0`
- Zoom range: 50% to 300%

### 🌙 **Theme Management**
- **Toggle Dark Mode**: `Ctrl/Cmd + Shift + D`
- **System Theme**: Automatically follows your OS theme
- Native integration with system preferences

### ⌨️ **Keyboard Shortcuts**
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + +` | Zoom In |
| `Ctrl/Cmd + -` | Zoom Out |
| `Ctrl/Cmd + 0` | Reset Zoom |
| `Ctrl/Cmd + Shift + D` | Toggle Dark Mode |
| `Ctrl/Cmd + R` | Reload Page |
| `Ctrl/Cmd + W` | Close App |
| `F12` | Toggle Developer Tools |

### 🛠️ **Additional Features**
- **External Links**: Automatically opens in your default browser
- **Menu Integration**: Full menu bar with all features
- **Preload Security**: Secure context isolation enabled
- **Custom Icon**: Beautiful Colab-themed app icon

## 🚀 Quick Start

### 📥 **Download & Run (Recommended)**

**For end users who just want to use the app:**

1. **Download the latest release**
   - Go to [Releases](https://github.com/justvicthor/colab-desktop/releases)
   - Download `colab-desktop-win32-x64.zip` (Windows)
   - Extract the ZIP file
   - Run `colab-desktop.exe`

### 🛠️ **Development Setup**

**For developers who want to modify the code:**

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/justvicthor/colab_desktop.git
   cd colab_desktop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

## 📁 Project Structure

```
colab-desktop/
├── main.js              # Main Electron process
├── preload.js           # Preload script for security
├── package.json         # Project configuration
├── package-lock.json    # Dependency lock file
├── icon/                # App icons
│   ├── colab.png
│   ├── colab_go.png     # Current app icon
│   ├── colab_b.png
│   ├── colab_rb.png
│   └── colab_w.png
└── README.md            # This file
```

## 🛠️ Development

### Building for Production

To package the application for distribution:

```bash
# Install electron-builder (if not already installed)
npm install --save-dev electron-builder

# Build for current platform
npm run build

# Build for all platforms
npm run build:all
```

### Adding New Features

The main application logic is in `main.js`. Key areas:

- **Window Configuration**: Lines 8-16
- **Menu Setup**: Lines 29-90
- **Keyboard Shortcuts**: Lines 95-140
- **Theme Management**: Uses Electron's `nativeTheme` API

## 🔧 Configuration

### Changing the App Icon

Replace the icon files in the `/icon` directory and update the path in `main.js`:

```javascript
icon: path.join(__dirname, 'icon', 'your-icon.png')
```

### Customizing Zoom Levels

Modify the zoom limits in `main.js`:

```javascript
// Current: 50% to 300%
win.webContents.setZoomFactor(Math.min(currentZoom + 0.1, 3.0)); // Max zoom
win.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.5)); // Min zoom
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Colab](https://colab.research.google.com/) for the amazing platform
- [Electron](https://www.electronjs.org/) for making desktop apps with web technologies possible
- Icons from Google Colab's official resources

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/justvicthor/colab-desktop/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your system and the issue

---

**Made with ❤️ for the data science community**

*Enjoy coding in Google Colab with a native desktop experience!*

# TV Static WebGL

A WebGL-based TV static effect packaged as a modern web component. Create realistic CRT-style static noise for your web projects.

## 🚀 Quick Start (CDN)

Simply include the script and use the web component:

```html
<!DOCTYPE html>
<html>
<head>
    <title>TV Static Demo</title>
</head>
<body>
    <!-- Include the TV Static component -->
    <script src="https://your-cdn.com/tv-static.umd.js"></script>
    
    <!-- Use the web component -->
    <tv-static auto-start lines="120" style="width: 100vw; height: 100vh;"></tv-static>
</body>
</html>
```

## 📦 Installation

### CDN (Recommended)
```html
<script src="https://your-cdn.com/tv-static.umd.js"></script>
```

### ES Modules
```html
<script type="module">
  import 'https://your-cdn.com/tv-static.es.js';
</script>
```

### NPM (for bundlers)
```bash
npm install tv-static-webgl
```

## 🎮 Usage

### Basic Usage
```html
<tv-static auto-start></tv-static>
```

### With Custom Settings
```html
<tv-static 
  auto-start 
  lines="240" 
  style="width: 800px; height: 600px;">
</tv-static>
```

### Programmatic Control
```html
<tv-static id="static" lines="120"></tv-static>

<script>
  const staticElement = document.getElementById('static');
  
  // Wait for the component to be ready
  staticElement.addEventListener('tv-static-ready', () => {
    // Start the animation
    staticElement.start();
    
    // Change line density
    staticElement.setLines(180);
    
    // Stop the animation
    // staticElement.stop();
  });
  
  // Handle errors
  staticElement.addEventListener('tv-static-error', (event) => {
    console.error('TV Static error:', event.detail.error);
  });
</script>
```

## 🔧 API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `lines` | number | `120` | Number of vertical lines (affects resolution/detail) |
| `auto-start` | boolean | `false` | Whether to start animation automatically |

### Methods

| Method | Description |
|--------|-------------|
| `start()` | Start the static animation |
| `stop()` | Stop the static animation |
| `setLines(number)` | Change the number of vertical lines |

### Events

| Event | Description |
|-------|-------------|
| `tv-static-ready` | Fired when the component is initialized and ready |
| `tv-static-error` | Fired when there's an initialization error |

## 🎨 Styling

The component is designed to fill its container. Use CSS to control size and appearance:

```css
tv-static {
  width: 100vw;
  height: 100vh;
  display: block;
}

/* Fullscreen background effect */
.tv-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
```

## 💡 Examples

### Fullscreen Background
```html
<tv-static 
  class="tv-background" 
  auto-start 
  lines="120">
</tv-static>
```

### Retro TV Effect
```html
<div style="width: 640px; height: 480px; border: 20px solid #333; border-radius: 10px;">
  <tv-static auto-start lines="240"></tv-static>
</div>
```

### Interactive Control Panel
```html
<tv-static id="interactive-static" lines="120"></tv-static>

<div>
  <button onclick="document.getElementById('interactive-static').start()">Start</button>
  <button onclick="document.getElementById('interactive-static').stop()">Stop</button>
  <input type="range" min="60" max="300" value="120" 
         onchange="document.getElementById('interactive-static').setLines(this.value)">
  <span>Lines: <span id="line-count">120</span></span>
</div>
```

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd tv-static

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build library for CDN distribution
npm run build

# Output files:
# dist/tv-static.es.js    - ES module
# dist/tv-static.umd.js   - UMD bundle (for CDN)
```

### Project Structure
```
src/
├── tv-static.js        # Core WebGL TV static class
├── webcomponent.js     # Web component wrapper
└── shaders/
    ├── vertex.glsl     # Vertex shader
    └── fragment.glsl   # Fragment shader
```

## 🎯 Browser Support

- Chrome 51+
- Firefox 52+
- Safari 10+
- Edge 79+

Requires WebGL support. The component will throw an error if WebGL is not available.

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on GitHub. 
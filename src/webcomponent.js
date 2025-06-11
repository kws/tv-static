import { TVStatic } from './tv-static.js';

export class TVStaticElement extends HTMLElement {
  constructor() {
    super();
    this.tvStatic = null;
    this.canvas = null;
  }

  static get observedAttributes() {
    return ['lines', 'auto-start'];
  }

  connectedCallback() {
    this.createCanvas();
    this.initTVStatic();
  }

  disconnectedCallback() {
    if (this.tvStatic) {
      this.tvStatic.destroy();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.tvStatic) return;

    switch (name) {
      case 'lines':
        const lines = parseInt(newValue) || 120;
        this.tvStatic.setLines(lines);
        break;
      case 'auto-start':
        if (newValue !== null) {
          this.tvStatic.start();
        } else {
          this.tvStatic.stop();
        }
        break;
    }
  }

  createCanvas() {
    // Apply styles
    this.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: black;
      overflow: hidden;
    `;

    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      display: block;
      width: 100%;
      height: 100%;
    `;

    this.appendChild(this.canvas);
  }

  async initTVStatic() {
    try {
      this.tvStatic = new TVStatic(this.canvas);
      await this.tvStatic.init();
      
      // Set initial attributes
      const lines = this.getAttribute('lines');
      if (lines) {
        this.tvStatic.setLines(parseInt(lines));
      }

      // Auto-start if specified
      if (this.hasAttribute('auto-start')) {
        this.tvStatic.start();
      }

      // Dispatch ready event
      this.dispatchEvent(new CustomEvent('tv-static-ready', {
        detail: { tvStatic: this.tvStatic }
      }));
    } catch (error) {
      console.error('Failed to initialize TV Static:', error);
      this.dispatchEvent(new CustomEvent('tv-static-error', {
        detail: { error }
      }));
    }
  }

  // Public API methods
  start() {
    if (this.tvStatic) {
      this.tvStatic.start();
    }
  }

  stop() {
    if (this.tvStatic) {
      this.tvStatic.stop();
    }
  }

  setLines(lines) {
    if (this.tvStatic) {
      this.tvStatic.setLines(lines);
    }
  }
}

// Register the custom element
customElements.define('tv-static', TVStaticElement);

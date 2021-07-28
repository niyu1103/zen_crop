import { App } from './src/app.js';

// Launch app when DOM will be ready
window.addEventListener("DOMContentLoaded", () => {
  // window.console.info = () => { };
  // window.console.log = () => { };
  // window.console.dir = () => { };

  new App().init();

});


export default class FPSCounter {
  constructor(scene) {
    this.scene = scene;
    this.initText();
    this.startFps();
  }

  initText() {
    this.text = this.scene.add.text(30, 30, "fps:", { color: '#fff000', fontSize: 40})
    .setDepth(99);
  }

  getFPS() {
    return this.text.text;
  }

  startFps() {
    const times = [];
    let fps = 0;
    let shown = false;

    const refreshLoop = () => {
      window.requestAnimationFrame(() => {
        const now = performance.now();

        while (times.length > 0 && times[0] <= now - 1000) {
          times.shift();
        }
        times.push(now);
        fps = times.length;
        if (!shown) {
          this.text.setText(`fps: ${fps}`);
          shown = true;
          setTimeout(() => {
            shown = false;
          }, 250);
        }

        refreshLoop();
      });
    };

    refreshLoop();
  }
}
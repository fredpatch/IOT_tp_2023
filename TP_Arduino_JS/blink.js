const { Board, Led } = require("johnny-five");
const board = new Board({port:6});

board.on("ready", () => {

  // Create a standard `led` component instance
  const led = new Led(10);

  // "blink" the led in 500ms
  // on-off phase periods
  led.blink(500);
});
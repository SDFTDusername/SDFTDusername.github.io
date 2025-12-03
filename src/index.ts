import { Window } from "./elements/window.js";
import { randomInt, screenHeight, screenWidth } from "./utils.js";

customElements.define("c-window", Window);

const newWindowBtn = document.getElementById("newWindowBtn") as HTMLButtonElement;

const windows: Window[] = [];

newWindowBtn.addEventListener("click", () => {
  const width = randomInt(1, screenWidth());
  const height = randomInt(1, screenHeight());

  const x = randomInt(0, screenWidth() - width);
  const y = randomInt(0, screenHeight() - height);

  const window = new Window;

  window.x = x;
  window.y = y;

  window.width = width;
  window.height = height;

  document.body.appendChild(window);
});

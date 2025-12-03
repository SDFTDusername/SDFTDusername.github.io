import { Window } from "./elements/window.js";
import { getElem, randomInt, screenHeight, screenWidth } from "./utils.js";

customElements.define("c-window", Window);

const newWindowBtn = getElem<HTMLButtonElement>("newWindowBtn");
const windowsDiv = getElem<HTMLDivElement>("windowsDiv");

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

  windowsDiv.appendChild(window);
  windows.push(window);
});

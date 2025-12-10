import { Window } from "./elements/window.js";
import { GlobalAPI } from "./globalAPI.js";
import { getElem, randomInt, screenHeight, screenWidth } from "./utils.js";

customElements.define("c-window", Window);

const newWindowBtn = getElem<HTMLButtonElement>("newWindowBtn");
const windowsDiv = getElem<HTMLDivElement>("windowsDiv");

const globalApi = new GlobalAPI;
globalApi.setInDocument();

newWindowBtn.addEventListener("click", () => {
  const width = randomInt(250, screenWidth());
  const height = randomInt(60, screenHeight());

  const x = randomInt(0, screenWidth() - width);
  const y = randomInt(0, screenHeight() - height);

  const window = new Window(globalApi);

  window.x = x;
  window.y = y;

  window.width = width;
  window.height = height;

  windowsDiv.appendChild(window);
});

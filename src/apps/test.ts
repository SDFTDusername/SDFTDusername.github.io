import { WindowAPI } from "../windowAPI.js";

const api = WindowAPI.getFromDocument()!;

const closeBtn = api.body.querySelector("#closeBtn") as HTMLButtonElement;
closeBtn.addEventListener("click", () => {
  api.close();
});

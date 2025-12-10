import { Window } from "./elements/window.js";
import { WindowAPI } from "./windowAPI.js";

export class GlobalAPI {
  currentScriptId = 0;
  windows = new Map<number, Window>;

  nextWindowId(): number {
    let windowId = 0;

    while (this.windows.has(windowId))
      ++windowId;

    return windowId;
  }

  setInDocument() {
    document.globalAPI = this;
  }

  static getFromDocument(): GlobalAPI | undefined {
    return document.globalAPI;
  }
}

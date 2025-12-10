import { Window } from "./elements/window.js";
import { GlobalAPI } from "./globalAPI.js";

export class WindowAPI {
  windowId!: number;
  globalApi!: GlobalAPI;
  window!: Window;

  body!: HTMLDivElement;
  script!: HTMLScriptElement;

  close() {
    this.globalApi.windows.delete(this.windowId);
    this.window.remove();
  }

  setInDocument() {
    document.currentWindowAPI = this;
  }

  static getFromDocument(): WindowAPI | undefined {
    return document.currentWindowAPI;
  }
}

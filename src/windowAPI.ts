import { GlobalAPI } from "./globalAPI.js";

export class WindowAPI {
  windowId!: number;
  globalApi!: GlobalAPI;

  body!: HTMLDivElement;
  script!: HTMLScriptElement;

  test() {
    window.alert(`test from window ID ${this.windowId}`);
  }

  setInDocument() {
    document.currentWindowAPI = this;
  }

  static getFromDocument(): WindowAPI | undefined {
    return document.currentWindowAPI;
  }
}

import { GlobalAPI } from "../globalAPI.js";
import { WindowAPI } from "../windowAPI.js";

export class Window extends HTMLElement {
  static observedAttributes = ["x", "y", "width", "height", "app", "title"];

  globalApi: GlobalAPI;
  windowId: number;
  windowApi: WindowAPI;

  titleBarText?: HTMLDivElement;
  bodyDiv?: HTMLDivElement;

  body?: HTMLDivElement;
  script?: HTMLScriptElement;

  constructor(globalApi: GlobalAPI) {
    super();

    this.globalApi = globalApi
    this.windowId = globalApi.nextWindowId();

    this.windowApi = new WindowAPI;
    this.windowApi.globalApi = globalApi;
    this.windowApi.windowId = this.windowId;

    globalApi.windows.set(this.windowId, this);
  }

  connectedCallback() {;
    this.style.position = "absolute";

    const window = this.createDiv(this, "window", "glass", "active");

    const titleBar = this.createDiv(window, "title-bar");
    this.titleBarText = this.createDiv(titleBar, "title-bar-text");

    const titleBarControls = this.createDiv(titleBar, "title-bar-controls");
    this.createButton(titleBarControls, "Minimize");
    this.createButton(titleBarControls, "Maximize");
    this.createButton(titleBarControls, "Close");

    this.bodyDiv = this.createDiv(window, "window-body", "has-space", "has-scrollbar");

    this.updateStyle();
    this.loadApp();
  }

  async loadApp() {
    if (this.bodyDiv === undefined)
      return;

    const url = `/apps/${this.app}.html`;

    const response = await fetch(url);
    if (!response.ok)
      return;

    while (this.bodyDiv.lastChild)
      this.bodyDiv.removeChild(this.bodyDiv.lastChild);

    this.script = document.createElement("script");
    this.script.type = "module";
    this.script.src = `/dist/apps/${this.app}.js?id=${this.windowId}`;
    this.script.defer = true;

    this.body = this.createDiv(this.bodyDiv);

    const html = await response.text();
    this.body.innerHTML = html;

    this.windowApi.body = this.body;
    this.windowApi.script = this.script;
    this.windowApi.setInDocument();

    this.bodyDiv.appendChild(this.script);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === "app") {
      this.loadApp();
      return;
    }

    this.updateStyle();
  }

  private createDiv(parent: HTMLElement, ...classList: string[]): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add(...classList);
    parent.appendChild(div);
    return div;
  }

  private createButton(parent: HTMLElement, ariaLabel: string): HTMLButtonElement {
    const button = document.createElement("button");
    button.ariaLabel = ariaLabel;
    parent.appendChild(button);
    return button;
  }

  private getAttr<T>(name: string, defaultValue: T, converter?: (value: string) => T) {
    if (this.hasAttribute(name)) {
      const value = this.getAttribute(name)!;
      return converter !== undefined ? converter(value) : (value as T);
    } else {
      this.setAttribute(name, `${defaultValue}`);
      return defaultValue;
    }
  }

  private updateStyle() {
    if (this.bodyDiv !== undefined) {
      this.style.left = `${this.x}px`;
      this.style.top = `${this.y}px`;

      this.bodyDiv.style.width = `${this.width}px`;
      this.bodyDiv.style.height = `${this.height}px`;
    }

    if (this.titleBarText !== undefined)
      this.titleBarText.innerText = this.title;
  }

  public get x() { return this.getAttr("x", 0, parseInt); }
  public set x(x) { this.setAttribute("x", `${x}`); }

  public get y() { return this.getAttr("y", 0, parseInt); }
  public set y(y) { this.setAttribute("y", `${y}`); }

  public get width() { return this.getAttr("width", 800, parseInt); }
  public set width(width) { this.setAttribute("width", `${width}`); }

  public get height() { return this.getAttr("height", 600, parseInt); }
  public set height(height) { this.setAttribute("height", `${height}`); }

  public get app() { return this.getAttr("app", "test"); }
  public set app(app) { this.setAttribute("app", app); }

  public get title() { return this.getAttr("title", "Window"); }
  public set title(title) { this.setAttribute("title", title); }
}

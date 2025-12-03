export class Window extends HTMLElement {
  static observedAttributes = ["x", "y", "width", "height"];

  bodyDiv?: HTMLDivElement;

  constructor() {
    super();
  }

  connectedCallback() {;
    this.style.position = "absolute";

    const window = document.createElement("div");
    window.classList.add("window", "active", "glass");

    const titleBar = this.createDiv(window, "title-bar");

    const titleBarText = this.createDiv(titleBar, "title-bar-text");
    titleBarText.innerText = "A glass window frame";

    const titleBarControls = this.createDiv(titleBar, "title-bar-controls");
    const _minimize = this.createButton(titleBarControls, "Minimize");
    const _maximize = this.createButton(titleBarControls, "Maximize");
    const _close = this.createButton(titleBarControls, "Close");

    this.bodyDiv = this.createDiv(window, "window-body");
    this.updateStyle();

    this.appendChild(window);
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
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
    if (this.bodyDiv === undefined)
      return;

    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;

    this.bodyDiv.style.width = `${this.width}px`;
    this.bodyDiv.style.height = `${this.height}px`;
  }

  public get x() { return this.getAttr("x", 0, parseInt); }
  public set x(x) { this.setAttribute("x", `${x}`); }

  public get y() { return this.getAttr("y", 0, parseInt); }
  public set y(y) { this.setAttribute("y", `${y}`); }

  public get width() { return this.getAttr("width", 800, parseInt); }
  public set width(width) { this.setAttribute("width", `${width}`); }

  public get height() { return this.getAttr("height", 600, parseInt); }
  public set height(height) { this.setAttribute("height", `${height}`); }
}

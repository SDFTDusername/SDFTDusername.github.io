export class Window extends HTMLElement {
  static observedAttributes = ["x", "y", "width", "height"];

  div?: HTMLDivElement;

  constructor() {
    super();
    this.classList.add("window");
  }

  connectedCallback() {;
    this.style.position = "absolute";

    this.div = document.createElement("div");
    this.div.classList.add("window");

    this.appendChild(this.div);
    this.updateStyle();
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    this.updateStyle();
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
    if (this.div === undefined)
      return;

    this.style.left = `${this.x}px`;
    this.style.top = `${this.y}px`;

    this.div.style.width = `${this.width}px`;
    this.div.style.height = `${this.height}px`;
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

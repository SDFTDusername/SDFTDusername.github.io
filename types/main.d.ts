import { GlobalAPI } from "../src/globalAPI.js";
import { WindowAPI } from "../src/windowAPI.js"

declare global {
  export interface Document {
    globalAPI?: GlobalAPI;
    currentWindowAPI?: WindowAPI;
  }
}

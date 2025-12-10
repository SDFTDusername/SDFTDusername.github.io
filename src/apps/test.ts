import { WindowAPI } from "../windowAPI.js";

const api = WindowAPI.getFromDocument()!;
api.test();
api.globalApi.test();

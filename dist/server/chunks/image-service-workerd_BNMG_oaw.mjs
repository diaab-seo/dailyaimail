globalThis.process ??= {};
globalThis.process.env ??= {};
import { b as baseService } from "./image-transform-endpoint_CrtGZe4f.mjs";
import "./worker-entry_BXYNOXxR.mjs";
const service = {
  ...baseService,
  async transform(inputBuffer, transform) {
    return { data: inputBuffer, format: transform.format };
  }
};
var image_service_workerd_default = service;
export {
  image_service_workerd_default as default
};

import { backEndConfig, frontEndConfig } from "../../data/localConfig.js";

export const { protocol, base, port } = backEndConfig;
export const backEndURL = `${protocol}://${base}:${port}`;

export const frontEndURL = `${frontEndConfig.protocol}://${frontEndConfig.base}:${frontEndConfig.port}`;
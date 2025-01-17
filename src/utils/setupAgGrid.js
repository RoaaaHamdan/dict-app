import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

export const setupAgGrid = () => {
  ModuleRegistry.registerModules([AllCommunityModule]);
};

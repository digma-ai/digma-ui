import type { Middleware } from "@reduxjs/toolkit";
import { digmaApi } from "../../redux/services/digma";
import { issuesReportSlice } from "../../redux/slices/issuesReportSlice";
import { repositorySlice } from "../../redux/slices/repositorySlice";
import { useStore } from "../../store/useStore";
import { store } from "./store";

// This middleware synchronizes the redux state with the zustand state "config" slice
export const configSyncMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  // Sync backend info
  if (digmaApi.endpoints.getAbout.matchFulfilled(action)) {
    useStore.getState().setBackendInfo({
      applicationVersion: action.payload.applicationVersion,
      deploymentType: action.payload.deploymentType,
      centralize: action.payload.isCentralize,
      site: action.payload.site,
      features: action.payload.features
    });
  }

  // Sync environments
  if (digmaApi.endpoints.getEnvironments.matchFulfilled(action)) {
    useStore.getState().setEnvironments(action.payload);

    // Sync selected environment
    const state = store.getState();
    const selectedEnvironmentId = state.codeIssuesReport.selectedEnvironmentId;
    const environment =
      action.payload.find((env) => env.id === selectedEnvironmentId) ?? null;

    useStore.getState().setEnvironment(environment);
  }

  // Sync selected environment on change
  if (issuesReportSlice.actions.setSelectedEnvironmentId.match(action)) {
    if (!action.payload) {
      useStore.getState().setEnvironment(null);
    } else {
      const state = store.getState();
      const environment =
        state.app.environments?.find((env) => env.id === action.payload) ??
        null;

      useStore.getState().setEnvironment(environment);
    }
  }

  // Sync selected services
  if (issuesReportSlice.actions.setSelectedServices.match(action)) {
    useStore.getState().setSelectedServices(action.payload);
  }

  // Sync scope
  if (repositorySlice.actions.setScope.match(action)) {
    useStore.getState().setScope(action.payload);
  }

  return result;
};

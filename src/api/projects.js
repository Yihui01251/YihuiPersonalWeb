import { apiRequest } from "./client";

export const fetchProjectViews = ({ signal } = {}) => apiRequest("/projects/views", { signal });

export const recordProjectView = (id) =>
  apiRequest(`/projects/${encodeURIComponent(id)}/views`, { method: "POST" });

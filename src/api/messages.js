import { apiRequest } from "./client";

const query = (params) => {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== null && value !== undefined),
  ).toString();
  return search ? `?${search}` : "";
};

export const fetchMessages = ({ cursor = null, signal } = {}) =>
  apiRequest(`/messages${query({ cursor })}`, { signal });

export const submitMessage = (input) => apiRequest("/messages", { method: "POST", body: input });

export const fetchAdminMessages = (token, { status, cursor = null }) =>
  apiRequest(`/admin/messages${query({ status, cursor })}`, { token });

export const updateMessageStatus = (token, id, status) =>
  apiRequest(`/admin/messages/${id}`, { method: "PATCH", token, body: { status } });

export const deleteMessage = (token, id) =>
  apiRequest(`/admin/messages/${id}`, { method: "DELETE", token });

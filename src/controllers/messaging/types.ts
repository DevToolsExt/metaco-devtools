export enum MESSAGE_SOURCE {
  POPUP = "popup",
  BACKGROUND = "background",
  CONTENT = "content",
  ALL = "all",
}

export enum MESSAGE_ACTIONS {
  PAGE_LOADED,
  INIT_CONNECTION,
  CONNECTED,
  SHOW_INTENT_DETAILS,
  RENEW_SESSION,
}

export type MESSAGE_DATA<Data = unknown> = {
  from: MESSAGE_SOURCE;
  to: MESSAGE_SOURCE;
  data: Data;
  action: MESSAGE_ACTIONS;
};

export const getCurrentURL = () => new URL(window.location.href);

export enum HAROMINZE_PAGE {
  HOME = "home",
  INTENTS = "intents",
}

export const getCurrentPage = (): HAROMINZE_PAGE =>
  getCurrentURL().pathname.split("/").pop() as HAROMINZE_PAGE;

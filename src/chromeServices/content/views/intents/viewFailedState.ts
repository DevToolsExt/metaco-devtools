import { getSelectors } from "../../utils/dom";

const className = "devtools-failed-intent-alert";

export type IntentErrorState = {
  code: string;
  message: string;
};

export const viewFailedState = ({ code: title, message }: IntentErrorState) => {
  if (getSelectors(`.${className}`).element) return;

  const detailsEl = getSelectors(".MuiTypography-subtitle1");

  if (!detailsEl.element) return;

  const alert = document.createElement("div");
  alert.classList.add(`alert`);
  alert.classList.add(`alert-danger`);
  alert.classList.add(className);
  (alert as any).role = "alert";

  const titleEl = document.createElement("h5");
  titleEl.classList.add("alert-heading");

  titleEl.innerHTML = title;

  const messageEl = document.createElement("p");

  messageEl.innerHTML = message;

  alert.appendChild(titleEl);
  alert.appendChild(messageEl);

  const grandParent = detailsEl.parent.parentElement;
  grandParent.insertBefore(alert, grandParent.children[0]);
};

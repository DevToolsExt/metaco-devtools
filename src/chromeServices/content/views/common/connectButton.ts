import { waitUntil } from "../../utils/common";
import { getSelectors } from "../../utils/dom";

export async function showConnectButton(handler: (evt: any) => void) {
  const selector = () => getSelectors("footer");

  waitUntil(() => selector().element !== undefined).then(() => {
    const footer = selector();

    if (getSelectors(".metaco-dev-tools-btn-parent").element) return;

    const listItem = footer.element.children[0].cloneNode();

    listItem.classList.add("metaco-dev-tools-btn-parent");

    const btn = document.createElement("button");

    btn.innerHTML = "Connect with Dev Tools";

    btn.onclick = handler;

    listItem.appendChild(btn);

    footer.element?.insertBefore(listItem, footer.element.children[0]);
  });
}

export function hideConnectionButton() {
  getSelectors(".metaco-dev-tools-btn-parent").element.remove();
}

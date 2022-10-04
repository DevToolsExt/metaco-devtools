import { getSelectors, parentHasChildWithClassName } from "../../utils/dom";
import { createTable } from "../common/createTable";

export const viewCustomProperties = (customProperties: any) => {
  const selector = getSelectors(".MuiTypography-subtitle1");

  if (!selector.element || !Object.keys(customProperties).length) return;

  if (parentHasChildWithClassName(selector.parent, "custom-properties")) return;

  const customPropsEl = selector.parent.children[2].cloneNode(true);

  customPropsEl.classList.add("custom-properties");

  customPropsEl.children[0].innerHTML = "Custom Properties";
  customPropsEl.removeChild(customPropsEl.lastChild);

  selector.parent.insertBefore(
    customPropsEl,
    selector.parent.children[selector.parent.children.length - 1]
  );

  const tableData = [];
  for (const name in customProperties) {
    const value = customProperties[name];
    tableData.push({
      name,
      value,
    });
  }

  customPropsEl.appendChild(createTable(tableData));
};

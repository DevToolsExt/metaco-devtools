export function getSelectors(selectorString: string) {
  const element = ($ as any)(selectorString)[0] as any;
  return {
    element,
    parent: element?.parentElement as any,
  };
}

export function parentHasChildWithClassName(
  parent: HTMLElement,
  className: string
) {
  for (let child = 0; child < parent.children.length; child++) {
    const element = parent.children[child];
    if (element.classList.contains(className)) return true;
  }

  return false;
}

const createElement = (tagName, innerHTML, props) => {
  const $element = document.createElement(tagName);
  if (innerHTML) $element.innerHTML = innerHTML;
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      $element[key] = value;
    });
  }

  return $element;
};

const html = (string, ...values) => {
  return String.raw(string, ...values);
};

export { createElement, html };

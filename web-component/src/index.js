class PageA extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "A";
  }
}
customElements.define("my-a", PageA);

class PageB extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "B";
  }
}
customElements.define("my-b", PageB);

const routes = [
  {
    path: "/",
    component: PageA,
    label: "Home",
    iconSrc: null,
  },
  {
    path: "/",
    component: PageB,
    label: "page B",
    iconSrc: null,
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const page = routes.find(
    (value) => value.path === window.location.pathname
  ).component;
  const pageNode = new page();
  switch (page) {
    case PageA:
      pageNode.tabIndex = -1;
      break;
    case PageB:
      // pageB attribute 정의
      break;
  }

  document.querySelector("#root").append(pageNode);
});

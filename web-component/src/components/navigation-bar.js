import { html } from "../utils";

export class NavigationBar extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: "open",
    });

    shadow.innerHTML = html`
      <nav>
        <ul>
          <li><a href="/" data-link>Home</a></li>
          <li><a href="/about" data-link>About</a></li>
          <li><a href="/contact" data-link>Contact</a></li>
        </ul>
      </nav>
    `;
  }

  connectedCallback() {
    this.addEventListener("click", (event) => {
      const link = event.target.closest("[data-link]");
      if (!link) {
        return;
      }
      event.preventDefault();
      const navigateEvent = new CustomEvent("navigate", {
        detail: {
          url: link.href,
        },
      });
      this.dispatchEvent(navigateEvent);
    });
  }
}

customElements.define("navigation-bar", NavigationBar);

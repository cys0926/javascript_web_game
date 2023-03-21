import { html } from "../utils";

export class AboutPage extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: "open",
    });

    shadow.innerHTML = html`
      <h1>About Page</h1>
      <p>Welcome to the home page!</p>
    `;
  }
}

customElements.define("about-page", AboutPage);

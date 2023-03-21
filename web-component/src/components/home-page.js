import { html } from "../utils";

export class HomePage extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: "open",
    });

    shadow.innerHTML = html`
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    `;
  }
}

customElements.define("home-page", HomePage);

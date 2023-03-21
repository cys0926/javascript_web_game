import { html } from "../utils";

export class ContactPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = html` <h1>Contact Us</h1>
      <form>
        <label for="name"> <input /></label>
      </form>`;
  }
}

customElements.define("contact-page", ContactPage);

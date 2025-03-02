import { html } from "lit-html";
import { WebComponent } from "./lib";

window.customElements.define(
  "tag-pill",
  class extends WebComponent {
    styles = `
      a {
        color: var(--blue-12);
        text-decoration: none;

        padding-block: 0.25rem;
        padding-inline: 0.5rem;

        border: 1px solid var(--blue-10);
        border-radius: 0.25rem;
        &:hover {
          background-color: var(--blue-4);
        }
      }
    `;

    render() {
      return html`<a href=${this.getAttribute("href")}><slot /></a>`;
    }
  },
);

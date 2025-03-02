import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import Email from "~icons/mdi/email";
import { WebComponent } from "./lib";

window.customElements.define(
  "social-link",
  class extends WebComponent {
    styles = `
      a {
        color: var(--gray-11);
        transition: all 0.2s ease;
      }
      a:hover {
        color: var(--gray-12);
      }

      svg {
        width: 30px;
        height: 30px;
      }
    `;

    render() {
      let rawIcon: string | null = this.getAttribute("rawicon");
      let href: string | null = this.getAttribute("href");
      let label: string | null = this.getAttribute("label");

      return html`<a href=${href} aria-label=${label}>
        ${unsafeHTML(rawIcon)}
      </a>`;
    }
  },
);

window.customElements.define(
  "email-link",
  class extends WebComponent {
    render() {
      return html`
        <social-link
          rawicon=${Email}
          href=${atob("bWFpbHRvOnZpbmNlbnRAdi10aG9tYXMuY29t")}
          label="Send email to my address"
        ></social-link>
      `;
    }
  },
);

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("social-link")
export class SocialLink extends LitElement {
  static styles = css`
    a {
      color: oklch(0.707 0.022 261.325);
      transition: all 0.2s ease;
    }
    a:hover {
      color: white;
    }

    svg {
      width: 30px;
      height: 30px;
    }
  `;

  @property() rawIcon?: string;
  @property() href?: string;

  protected render() {
    return html`<a href="${this.href}">${unsafeHTML(this.rawIcon)}</a>`;
  }
}

import Email from "~icons/mdi/email";

@customElement("email-link")
export class EmailLink extends LitElement {
  protected render() {
    return html`<social-link
      rawIcon="${Email}"
      href="mailto:vincent@v-thomas.com"
    ></social-link>`;
  }
}

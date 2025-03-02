import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@customElement("social-link")
export class SocialLink extends LitElement {
  static styles = css`
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

  @property() rawIcon?: string;
  @property() href?: string;
  @property() label?: string;

  protected render() {
    return html`<a href="${this.href}" aria-label="${this.label}"
      >${unsafeHTML(this.rawIcon)}</a
    >`;
  }
}

import Email from "~icons/mdi/email";

@customElement("email-link")
export class EmailLink extends LitElement {
  protected render() {
    return html`<social-link
      rawIcon="${Email}"
      href="${atob("bWFpbHRvOnZpbmNlbnRAdi10aG9tYXMuY29t")}"
      label="Send email to my address"
    ></social-link>`;
  }
}

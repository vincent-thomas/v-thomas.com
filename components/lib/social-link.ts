import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

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

  @property() href?: string;
  @property() label?: string;

  render() {
    return html`<a href=${this.href} aria-label=${this.label}>
      <slot />
    </a>`;
  }
}

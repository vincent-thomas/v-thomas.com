import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("social-link")
export class SocialLink extends LitElement {
  static styles = css`
    span {
      color: var(--gray-11);
      transition: all 0.2s ease;
    }
    span:hover {
      color: var(--gray-12);
    }
  `;

  @property() href?: string;
  @property() label?: string;

  render() {
    return html`<span href=${this.href} aria-label=${this.label}>
      <slot />
    </span>`;
  }
}

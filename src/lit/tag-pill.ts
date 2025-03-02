import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("tag-pill")
export class SocialLink extends LitElement {
  static styles = css`
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

  @property() href: string = "#";

  protected render() {
    return html`<a href=${this.href}><slot /></a>`;
  }
}

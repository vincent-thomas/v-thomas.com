import { css, LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("tag-pill")
export class TagPill extends LitElement {
  static styles = css`
    span {
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
    return html`<span><slot /></span>`;
  }
}

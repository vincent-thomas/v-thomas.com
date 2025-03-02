import { render, type TemplateResult } from "lit-html";

export abstract class WebComponent extends HTMLElement {
  styles?: string;

  abstract render(): TemplateResult;

  $hasRendered = false;

  connectedCallback() {
    if (this.$hasRendered) return;

    const shadow = this.attachShadow({ mode: "open" });

    if (!!this.styles) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(this.styles);
      shadow.adoptedStyleSheets = [sheet];
    }

    const result = this.render();

    render(result, shadow);

    this.$hasRendered = true;
  }
}

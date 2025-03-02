import { render, type TemplateResult } from "lit-html";

import { compileString } from "sass";

export abstract class WebComponent extends HTMLElement {
  styles?: string;

  abstract render(): TemplateResult;

  $hasRendered = false;

  connectedCallback() {
    if (this.$hasRendered) return;

    const shadow = this.attachShadow({ mode: "open" });

    if (!!this.styles) {
      const sheet = new CSSStyleSheet();
      const { css } = compileString(this.styles);
      sheet.replaceSync(css);
      shadow.adoptedStyleSheets = [sheet];
    }

    const result = this.render();

    render(result, shadow);

    this.$hasRendered = true;
  }
}

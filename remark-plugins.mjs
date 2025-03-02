import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { execSync } from "child_process";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    data.astro.frontmatter.minuteRead = readingTime.minutes;
  };
}

export function remarkModifiedTime() {
  return function (_tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}

import { Editor, Plugin, TFile } from "obsidian";
import { pickRandomItems } from "./quote-selection";
import { KOREAN_QUOTES } from "./quotes.ko";

type DailySaying = string;

const QUOTE_FORMAT = `>[!quote] Daily Saying
> {content}`;
const QUOTE_TEMPLATE_PLACEHOLDER = "{{daily-saying-kr}}";
const PLACEHOLDER_INTERVAL_SECONDS = 2;

export default class DailySayingPlugin extends Plugin {
  private isUpdatingPlaceholder = false;
  private templateFolder: string | null = null;

  async onload(): Promise<void> {
    await this.loadTemplateFolder();

    this.registerInterval(
      window.setInterval(
        () => void this.updateQuotePlaceholder(),
        PLACEHOLDER_INTERVAL_SECONDS * 1000,
      ),
    );

    this.addCommand({
      id: "daily-saying-random",
      name: "Insert random daily saying",
      editorCallback: (editor: Editor) => {
        editor.replaceSelection(this.formatQuote(this.pickRandomQuote()));
      },
    });
  }

  private async updateQuotePlaceholder(): Promise<void> {
    if (this.isUpdatingPlaceholder) {
      return;
    }

    this.isUpdatingPlaceholder = true;

    try {
      const file = this.app.workspace.getActiveFile();
      if (!file || this.isTemplateFile(file)) {
        return;
      }

      const currentContent = await this.app.vault.read(file);
      if (!currentContent.includes(QUOTE_TEMPLATE_PLACEHOLDER)) {
        return;
      }

      const nextContent = this.replaceQuotePlaceholders(currentContent);

      await this.app.vault.modify(file, nextContent);
    } finally {
      this.isUpdatingPlaceholder = false;
    }
  }

  private formatQuote(saying: DailySaying): string {
    return QUOTE_FORMAT.replace("{content}", saying);
  }

  private pickRandomQuote(): DailySaying {
    return KOREAN_QUOTES[Math.floor(Math.random() * KOREAN_QUOTES.length)];
  }

  private replaceQuotePlaceholders(content: string): string {
    const parts = content.split(QUOTE_TEMPLATE_PLACEHOLDER);
    const placeholderCount = parts.length - 1;
    const quotes = pickRandomItems(KOREAN_QUOTES, placeholderCount);

    return parts.reduce((result, part, index) => {
      if (index === 0) {
        return part;
      }

      return `${result}${this.formatQuote(quotes[index - 1])}${part}`;
    }, "");
  }

  private async loadTemplateFolder(): Promise<void> {
    try {
      const configPath = `${this.app.vault.configDir}/templates.json`;
      const rawConfig = await this.app.vault.adapter.read(configPath);
      const config = JSON.parse(rawConfig) as { folder?: string };
      this.templateFolder = config.folder ?? null;
    } catch {
      this.templateFolder = null;
    }
  }

  private isTemplateFile(file: TFile): boolean {
    if (!this.templateFolder) {
      return false;
    }

    return (
      file.path === this.templateFolder ||
      file.path.startsWith(`${this.templateFolder}/`)
    );
  }
}

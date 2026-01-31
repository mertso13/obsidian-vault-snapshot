import { TFile, TFolder, Vault, normalizePath } from "obsidian";

export class VaultScraper {
	constructor(private vault: Vault) {}
	
	getFiles(targetPath: string): TFile[] {
		const normalizedPath = normalizePath(targetPath);
		const folder = this.vault.getAbstractFileByPath(normalizedPath);

		if (!folder || !(folder instanceof TFolder)) {
			return [];
		}

		const files: TFile[] = [];
		this.recursiveGetFiles(folder, files);
		return files;
	}

	private recursiveGetFiles(folder: TFolder, files: TFile[]): void {
		for (const child of folder.children) {
			if (child instanceof TFile && child.extension === "md") {
				files.push(child);
			} else if (child instanceof TFolder) {
				this.recursiveGetFiles(child, files);
			}
		}
	}
}

import { TFile, TFolder, Vault, normalizePath } from "obsidian";

export class VaultScraper {
	constructor(private vault: Vault) {}

	getFiles(targetPath: string, exclusions: string[] = []): TFile[] {
		const normalizedPath = normalizePath(targetPath);
		const folder = this.vault.getAbstractFileByPath(normalizedPath);

		if (!folder || !(folder instanceof TFolder)) {
			return [];
		}

		const files: TFile[] = [];
		this.recursiveGetFiles(folder, files, exclusions);
		return files;
	}

	private recursiveGetFiles(
		folder: TFolder,
		files: TFile[],
		exclusions: string[],
	): void {
		for (const child of folder.children) {
			if (
				exclusions.some((pattern) =>
					child.path.startsWith(normalizePath(pattern)),
				)
			) {
				continue;
			}

			if (child instanceof TFile && child.extension === "md") {
				files.push(child);
			} else if (child instanceof TFolder) {
				this.recursiveGetFiles(child, files, exclusions);
			}
		}
	}
}

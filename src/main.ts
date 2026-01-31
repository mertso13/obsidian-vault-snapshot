import { Notice, Plugin, TFile } from "obsidian";
import {
	DEFAULT_SETTINGS,
	FolderSnapshotSettings,
	FolderSnapshotSettingTab,
} from "./settings";
import { VaultScraper } from "./scraper";
import { MetadataExtractor } from "./extractor";
import { SnapshotGenerator } from "./generator";

export default class FolderSnapshotPlugin extends Plugin {
	settings: FolderSnapshotSettings;
	configPath = this.app.vault.configDir;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "create-snapshot",
			name: "Create snapshot",
			callback: () => this.createSnapshot(),
		});

		this.addSettingTab(new FolderSnapshotSettingTab(this.app, this));
	}

	async createSnapshot() {
		new Notice("Folder snapshot: generating snapshot...");

		try {
			const scraper = new VaultScraper(this.app.vault);
			const files = scraper.getFiles(this.settings.targetFolder);

			if (files.length === 0) {
				new Notice(`No notes found in: ${this.settings.targetFolder}`);
				return;
			}

			const metadataList = files.map((file) => {
				const cache = this.app.metadataCache.getFileCache(file);
				return MetadataExtractor.extract(file, cache);
			});

			const snapshotContent = SnapshotGenerator.generate(
				metadataList,
				this.settings.targetFolder,
			);

			const outputPath =
				this.configPath +
				"/plugins/obsidian-folder-snapshot/" +
				this.settings.outputFilename;
			const existingFile =
				this.app.vault.getAbstractFileByPath(outputPath);

			if (existingFile instanceof TFile) {
				await this.app.vault.modify(existingFile, snapshotContent);
			} else {
				await this.app.vault.create(outputPath, snapshotContent);
			}

			new Notice(`Snapshot created: ${outputPath}`);
		} catch (error) {
			console.error("Folder snapshot error:", error);
			new Notice("Failed to create snapshot. Check console for details.");
		}
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<FolderSnapshotSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

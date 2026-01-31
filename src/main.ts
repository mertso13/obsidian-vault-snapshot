import { Notice, Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	FolderSnapshotSettings,
	FolderSnapshotSettingTab,
} from "./settings";

export default class FolderSnapshotPlugin extends Plugin {
	settings: FolderSnapshotSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "create-manifest",
			name: "Create manifest",
			callback: () => {
				new Notice(
					"Folder snapshot manifest generation not yet implemented.",
				);
			},
		});

		this.addSettingTab(new FolderSnapshotSettingTab(this.app, this));
	}

	onunload() {}

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

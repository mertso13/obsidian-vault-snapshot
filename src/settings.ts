import { App, PluginSettingTab, Setting } from "obsidian";
import FolderSnapshotPlugin from "./main";

export interface FolderSnapshotSettings {
	targetFolder: string;
	outputFilename: string;
}

export const DEFAULT_SETTINGS: FolderSnapshotSettings = {
	targetFolder: "/",
	outputFilename: "folder-manifest.md",
};

export class FolderSnapshotSettingTab extends PluginSettingTab {
	plugin: FolderSnapshotPlugin;

	constructor(app: App, plugin: FolderSnapshotPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Target folder")
			.setDesc("The folder within your vault to scrape for metadata.")
			.addText((text) =>
				text
					.setPlaceholder("e.g. Projects/MyProject")
					.setValue(this.plugin.settings.targetFolder)
					.onChange(async (value) => {
						this.plugin.settings.targetFolder = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Output filename")
			.setDesc("The name of the generated manifest file.")
			.addText((text) =>
				text
					.setPlaceholder("Folder-manifest.md")
					.setValue(this.plugin.settings.outputFilename)
					.onChange(async (value) => {
						this.plugin.settings.outputFilename = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}

import { App, PluginSettingTab, Setting } from "obsidian";
import VaultSnapshotPlugin from "./main";

export interface VaultSnapshotSettings {
	targetFolder: string;
	outputFilename: string;
}

export const DEFAULT_SETTINGS: VaultSnapshotSettings = {
	targetFolder: "/",
	outputFilename: "vault-snapshot.md",
};

export class VaultSnapshotSettingTab extends PluginSettingTab {
	plugin: VaultSnapshotPlugin;

	constructor(app: App, plugin: VaultSnapshotPlugin) {
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
			.setDesc("The name of the generated snapshot file.")
			.addText((text) =>
				text
					.setPlaceholder("Vault-snapshot.md")
					.setValue(this.plugin.settings.outputFilename)
					.onChange(async (value) => {
						this.plugin.settings.outputFilename = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}

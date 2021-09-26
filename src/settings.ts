import { App, PluginSettingTab, Setting } from 'obsidian';
import type SKOSPlugin from './main';

export default class SKOSSettingTab extends PluginSettingTab {
	constructor(app: App, private plugin: SKOSPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'SKOS plugin settings.' });

		containerEl.createEl('h3', { text: 'Settings for LCSH' });

		new Setting(containerEl)
			.setName('Element limit')
			.setDesc(
				'The limit of elements that wil  be displayed when searching for a heading.'
			)
			.addText((text) => {
				text.setPlaceholder('Enter a number greater than 0.')
					.setValue(this.plugin.settings.elementCounter)
					.onChange(async (value) => {
						this.plugin.settings.elementCounter = value;
						this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Configure sorting order for Modal')
			.setDesc(
				'Choose the search type. \
		Left anchored searches are ordered alphabetically, are case and diacritic insensitive.\
		Keyword searches are in descending relevance order.'
			)
			.addDropdown((dropdown) => {
				dropdown.addOption('leftanchored', 'Left anchored search');
				dropdown.addOption('keyword', 'Keyword search');

				// select the currently saved option
				dropdown.setValue(this.plugin.settings.lcshSearchType);

				dropdown.onChange((newValue) => {
					// update and save the plugin settings
					this.plugin.settings.lcshSearchType = newValue;
					this.plugin.saveSettings();
				});
			});

		// keys for YAML
		new Setting(containerEl)
			.setName('YAML Key for \'broader\'')
			.setDesc('This will be the YAML key for the broader headings.')
			.addText((text) => {
				text.setPlaceholder('broader')
					.setValue(this.plugin.settings.broaderKey)
					.onChange(async (value) => {
						this.plugin.settings.broaderKey = value;
						this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName('YAML Key for \'narrower\'')
			.setDesc('This will be the YAML key for the narrower headings.')
			.addText((text) => {
				text.setPlaceholder('narrower')
					.setValue(this.plugin.settings.narrowerKey)
					.onChange(async (value) => {
						this.plugin.settings.narrowerKey = value;
						this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName('YAML Key for \'related\'')
			.setDesc('This will be the YAML key for the related headings.')
			.addText((text) => {
				text.setPlaceholder('related')
					.setValue(this.plugin.settings.relatedKey)
					.onChange(async (value) => {
						this.plugin.settings.relatedKey = value;
						this.plugin.saveSettings();
					});
			});
	}
}

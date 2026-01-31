import { CachedMetadata, TFile, getAllTags } from "obsidian";

export interface FileMetadata {
	title: string;
	tags: string[];
	links: string[];
}

export class MetadataExtractor {
	static extract(file: TFile, cache: CachedMetadata | null): FileMetadata {
		return {
			title: file.basename,
			tags: this.extractTags(cache),
			links: this.extractLinks(cache),
		};
	}

	private static extractTags(cache: CachedMetadata | null): string[] {
		if (!cache) return [];
		const tags = getAllTags(cache) || [];
		return [...new Set(tags)];
	}

	private static extractLinks(cache: CachedMetadata | null): string[] {
		if (!cache || !cache.links) return [];
		return cache.links.map((link) => link.link);
	}
}

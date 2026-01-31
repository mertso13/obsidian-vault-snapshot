import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SnapshotGenerator } from "../src/generator";

describe("SnapshotGenerator", () => {
	describe("generateHeader", () => {
		beforeEach(() => {
			vi.useFakeTimers();
			const date = new Date(2026, 0, 31, 12, 0, 0);
			vi.setSystemTime(date);
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should generate a header with the folder name and current date", () => {
			const folder = "My Notes";
			const result = (SnapshotGenerator as any).generateHeader(folder);
			expect(result).toContain("# Vault Snapshot: My Notes");
			expect(result).toContain("Generated on");
			expect(result).toContain(new Date().toLocaleString());
		});
	});
});

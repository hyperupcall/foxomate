import { fs } from "../deps.ts";
import { toml } from "../deps.ts";

import * as util from "../util/util.ts";

// TODO: test to ensure the following do or do not have || exit prepended

export const name = "Basalt";
export const description = "Lints basalt.toml files";
export const onFiles = [
	{
		files: ["basalt.toml"],
		async fn(opts: util.Opts, entry: fs.WalkEntry) {
			const text = await Deno.readTextFile(entry.path);
			const tomlObj = toml.parse(text);
			const pkg = tomlObj.package as Record<string, any>;

			if (!pkg) {
				util.logMissingProperty("package");
				return;
			}

			if (!pkg.type) {
				util.logMissingProperty("package.type");
			}
			util.ensureNotEmpty("package.type", pkg.type);

			if (!pkg.name) {
				util.logMissingProperty("package.name");
			}
			util.ensureNotEmpty("package.type", pkg.name);

			if (!pkg.slug) {
				util.logMissingProperty("package.slug");
			}
			util.ensureNotEmpty("package.type", pkg.slug);

			if (!pkg.version) {
				util.logMissingProperty("package.version");
			}
			util.ensureNotEmpty("package.type", pkg.version);

			if (!pkg.authors) {
				util.logMissingProperty("package.authors");
			}
			util.ensureNotEmpty("package.type", pkg.authors);

			if (!pkg.description) {
				util.logMissingProperty("package.description");
			}
			util.ensureNotEmpty("package.type", pkg.description);
		},
	},
];
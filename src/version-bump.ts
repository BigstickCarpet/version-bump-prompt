import { getNewVersion } from "./get-new-version";
import { getOldVersion } from "./get-old-version";
import { Options } from "./options";
import { VersionBumpOptions } from "./version-bump-options";
import { VersionBumpResults } from "./version-bump-results";

/**
 * Prompts the user for a version number and updates package.json and package-lock.json.
 *
 * @returns - The new version number
 */
export async function versionBump(): Promise<VersionBumpResults>;

/**
 * Bumps the version number in package.json, package-lock.json.
 *
 * @param version
 * The new version number, or a bump type, such as "major", "minor", "patch", etc.
 * Use "prompt" to prompt the user for the version number.
 */
export async function versionBump(version: string): Promise<VersionBumpResults>;

/**
 * Bumps the version number in one or more files, prompting the user if necessary.
 * Optionally also commits, tags, and pushes to git.
 */
export async function versionBump(options: VersionBumpOptions): Promise<VersionBumpResults>;

export async function versionBump(arg: VersionBumpOptions | string = {}): Promise<VersionBumpResults> {
  if (typeof arg === "string") {
    arg = { version: arg };
  }

  let options = new Options(arg);
  let oldVersion = await getOldVersion(options.files);
  let newVersion = await getNewVersion(oldVersion, options.version, options.preid);

  return {
    oldVersion,
    newVersion,
    commit: options.commitMessage || false,
    tag: options.tagName || false,
    files: options.files,
  };
}
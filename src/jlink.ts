import { convertToSeggerVersion } from "./common";
import JlinkAbstract, {
  JlinkDownload,
  JlinkInstallType,
  ProgressCallback,
} from "./jlinkAbstract";
import JlinkBundle from "./jlinkBundle";
import JlinkInstaller from "./jlinkInstaller";

export default class Jlink {
  installType: JlinkInstallType;
  os: typeof process.platform;
  arch: typeof process.arch;
  jlink: JlinkAbstract;

  constructor(
    installType?: "installer" | "bundle",
    os?: typeof process.platform,
    arch?: typeof process.arch
  ) {
    this.installType = installType || "installer";
    this.os = os || process.platform;
    this.arch = arch || process.arch;

    switch (this.installType) {
      case "installer":
        this.jlink = new JlinkInstaller(this.os, this.arch);
        return;
      case "bundle":
        this.jlink = new JlinkBundle(this.os, this.arch);
        return;
      default:
        throw new Error("Invalid install type");
    }
  }

  /**
   * Lists all JLink versions installed locally.
   *
   * @returns An array of strings representing the path of the installed JLink.
   */

  listLocalInstalled(): string[] {
    return this.jlink.listLocalInstalled();
  }
  /**
   * Lists all JLink versions provided by Nordic.
   *
   * @returns An array of object representing the content of the JLink.
   */
  async listRemote(): Promise<JlinkDownload[]> {
    return await this.jlink.listRemote();
  }

  /**
   * Downloads the specified version of JLink from Nordic.
   *
   * @param version - The version of JLink to download.
   * @param progressUpdate - Optional callback to track the download progress.
   * @returns A promise that resolves to the path of the downloaded JLink.
   */
  async download(
    version: string,
    progressUpdate?: ProgressCallback
  ): Promise<string> {
    return await this.jlink.download(version, progressUpdate);
  }

  /**
   * Downloads the specified version of JLink from Segger.
   *
   * @param version - The version of JLink to download.
   * @param progressUpdate - Optional callback to track the download progress.
   * @returns A promise that resolves to the path of the downloaded JLink.
   */
  async downloadFromSegger(
    version: string,
    progressUpdate?: ProgressCallback
  ): Promise<string> {
    return await this.jlink.downloadFromSegger(version, progressUpdate);
  }
  async install(installPath?: string) {
    await this.jlink.install(installPath);
  }

  /**
   * Downloads the specified version of JLink from Nordic and installs it.
   *
   * @param version - The version of JLink to download.
   * @param progressUpdate - Optional callback to track the download progress.
   */
  async downloadAndInstall(version: string, progressUpdate: ProgressCallback) {
    await this.jlink.downloadAndInstall(version, progressUpdate);
  }

  /**
   * Retrieves the version of the installed JLink.
   *
   * @returns A promise that resolves to a string representing the JLink version.
   */
  async getVersion(): Promise<string> {
    return await this.jlink.getVersion();
  }

  /**
   * Uploads the specified file to Nordic's Artifactory.
   *
   * @param filePath - The path to the JLink file to upload.
   * @param version - The version of the JLink being uploaded.
   * @param progressUpdate - Optional callback to track the upload progress.
   * @returns A promise that resolves to the URL the file was uploaded to.
   */
  async upload(
    filePath: string,
    version: string,
    progressUpdate?: ProgressCallback
  ): Promise<string> {
    return await this.jlink.upload(filePath, version, progressUpdate);
  }

  /**
   * Sets the path to the JLink library.
   * Also sets the path in system environment variable `NRF_JLINK_PATH`.
   *
   * @param path - The path to the JLink library.
   */
  setJlinkPath(path: string) {
    process.env["NRF_JLINK_PATH"] = path;
    this.jlink.setJlinkPath(path);
  }

  /**
   * Gets the path to the JLink library.
   *
   * @returns The path to the JLink library.
   */
  getJlinkPath() {
    return this.jlink.getJlinkPath();
  }

  /**
   * Sets the version to the JLink library to use.
   *
   * @param version - The version to the JLink library to use.
   */
  setJlinkVersion(version: string) {
    this.jlink.setJlinkVersion(version);
  }

  /**
   * Gets the version to the JLink library in use.
   *
   * @returns The version to the JLink library in use.
   */
  getJlinkVersion() {
    return this.jlink.getJlinkVersion();
  }

  /**
   * Accepts the JLink license.
   * This is required before using the JLink library.
   */
  acceptLicense() {
    this.jlink.acceptLicense();
  }

  /**
   * Declines the JLink license.
   */
  declineLicense() {
    this.jlink.declineLicense();
  }

  /**
   * Shows the JLink license.
   *
   * @returns The JLink license in text.
   */
  showLicense(): String {
    return this.jlink.showLicense();
  }
}

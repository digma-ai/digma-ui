import { Octokit } from "@octokit/rest";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import dependenciesJson from "../dependencies.json" assert { type: "json" };

interface DependenciesJson {
  jetBrainsPluginVersion: string;
  jaegerUIVersion: string;
  jaegerVersion: string;
}

interface DownloadReleaseAssetOptions {
  owner: string;
  repo: string;
  tag: string;
  assetName: string;
  outputPath: string;
  extractPath?: string;
}

// Get output path from command line arguments
let outputPath = "";
const outputArgIndex = process.argv.indexOf("--output");
if (outputArgIndex !== -1 && process.argv[outputArgIndex + 1]) {
  outputPath = path.resolve(process.argv[outputArgIndex + 1]);
} else {
  // eslint-disable-next-line no-console
  console.log("No output path provided.");
  process.exit(1);
}

// Ensure the output directory exists
fs.mkdirSync(outputPath, { recursive: true });

const extractZip = (zipPath: string, extractPath: string) => {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractPath, true);
};

const downloadReleaseAsset = async ({
  owner,
  repo,
  tag,
  assetName,
  outputPath,
  extractPath
}: DownloadReleaseAssetOptions) => {
  const octokit = new Octokit();

  try {
    const release = await octokit.rest.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    const asset = release.data.assets.find((a) => a.name === assetName);
    if (!asset) {
      // eslint-disable-next-line no-console
      console.error("GitHub release asset not found in release.");
      return;
    }

    const response = await octokit.request(`GET ${asset.url}`, {
      headers: {
        Accept: "application/octet-stream"
      }
    });

    const filePath = path.join(outputPath, assetName);
    fs.writeFileSync(filePath, Buffer.from(response.data as string, "binary"));

    if (extractPath) {
      extractZip(filePath, extractPath);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error downloading GitHub release asset:", error.message);
  }
};

const jaegerUIVersion = (dependenciesJson as DependenciesJson).jaegerUIVersion;
const tag = `v${jaegerUIVersion}`;
const assetName = `dist-${tag}.zip`;
const extractPath = path.resolve(outputPath, "./dist");
const zipPath = path.join(outputPath, assetName);

if (fs.existsSync(zipPath)) {
  // eslint-disable-next-line no-console
  console.log("Jaeger UI release asset already exists, skipping download...");
  extractZip(zipPath, extractPath);
  process.exit(0);
} else {
  void downloadReleaseAsset({
    owner: "digma-ai",
    repo: "jaeger-ui",
    tag,
    assetName,
    outputPath,
    extractPath
  });
}

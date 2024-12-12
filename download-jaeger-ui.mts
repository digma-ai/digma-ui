/* eslint-disable no-console */
import { Octokit } from "@octokit/rest";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import dependenciesJson from "./dependencies.json" assert { type: "json" };

interface DependenciesJson {
  jetBrainsPluginVersion: string;
  jaegerUIVersion: string;
  jaegerVersion: string;
}

// Get output path from command line arguments
let outputPath = "";
const outputArgIndex = process.argv.indexOf("--output");
if (outputArgIndex !== -1 && process.argv[outputArgIndex + 1]) {
  outputPath = path.resolve(process.argv[outputArgIndex + 1]);
} else {
  console.log("No output path provided.");
  process.exit(1);
}

// Ensure the output directory exists
fs.mkdirSync(outputPath, { recursive: true });

const jaegerUIVersion = (dependenciesJson as DependenciesJson).jaegerUIVersion;
const releaseTag = `v${jaegerUIVersion}`;
const assetName = `dist-${releaseTag}.zip`;
const extractPath = path.resolve(outputPath, "./dist");

const extractZip = (zipPath: string, extractPath: string) => {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractPath, true);
};

const downloadReleaseAsset = async () => {
  const octokit = new Octokit();

  try {
    const release = await octokit.rest.repos.getReleaseByTag({
      owner: "digma-ai",
      repo: "digma-ui", // Replace with jaeger-ui
      tag: releaseTag
    });

    const asset = release.data.assets.find((a) => a.name === assetName);
    if (!asset) {
      console.error("Asset not found in release.");
      return;
    }

    const response = await octokit.request(`GET ${asset.url}`, {
      headers: {
        Accept: "application/octet-stream"
      }
    });

    const filePath = path.join(outputPath, assetName);
    fs.writeFileSync(filePath, Buffer.from(response.data as string, "binary"));
    console.log(`Asset downloaded successfully: ${filePath}`);
  } catch (error) {
    console.error("Error downloading release asset:", error.message);
  }
};

const zipPath = path.join(outputPath, assetName);
if (fs.existsSync(zipPath)) {
  console.log("Zip already exists, skipping download...");
  extractZip(zipPath, extractPath);
  process.exit(0);
} else {
  void downloadReleaseAsset();
}

import { Octokit } from "@octokit/rest";
import AdmZip from "adm-zip";
import dotenv from "dotenv";
import fs from "fs-extra";
import path from "path";
import dependenciesJson from "../dependencies.json" with { type: "json" };

dotenv.config();

interface DependenciesJson {
  jetBrainsPluginVersion: string;
  visualStudioExtensionVersion: string;
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

const OUTPUT_PATH = path.resolve("./jaeger-ui");

// Ensure the output directory exists
fs.mkdirSync(OUTPUT_PATH, { recursive: true });

const extractZip = (zipPath: string, extractPath: string) => {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(extractPath);
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
const extractPath = path.resolve(OUTPUT_PATH, "./dist");
const zipPath = path.join(OUTPUT_PATH, assetName);

if (fs.existsSync(extractPath)) {
  fs.rmdirSync(extractPath, { recursive: true });
}

if (process.env.JAEGER_UI_PATH) {
  const customJaegerUIPath = path.resolve(process.env.JAEGER_UI_PATH);

  if (!fs.existsSync(customJaegerUIPath)) {
    // eslint-disable-next-line no-console
    console.error(
      `Jaeger UI distributive has not been found at ${customJaegerUIPath}`
    );
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log(`Using Jaeger UI distributive from ${customJaegerUIPath}`);

  fs.copySync(customJaegerUIPath, extractPath);

  process.exit(0);
}

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
    outputPath: OUTPUT_PATH,
    extractPath
  });
}

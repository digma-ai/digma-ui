import * as fs from "fs/promises";
import * as path from "path";

type Dependencies = Record<string, string>;

const isDependencies = (object: unknown): object is Dependencies =>
  typeof object === "object" &&
  object !== null &&
  !Array.isArray(object) &&
  Object.values(object).every((value) => typeof value === "string");

const readDependencyFile = async (path: string): Promise<Dependencies> => {
  const file = await fs.readFile(path, "utf-8");
  const dependenciesObject = JSON.parse(file) as unknown;

  if (!isDependencies(dependenciesObject)) {
    throw new Error(`Invalid format in ${path}`);
  }

  return dependenciesObject;
};

const dependenciesFilePath = path.resolve("./dependencies.json");
const dependencies = await readDependencyFile(dependenciesFilePath);

const dependenciesDiffFilePath = path.resolve("./dependencies.diff.json");
const dependenciesDiff = await readDependencyFile(dependenciesDiffFilePath);

const mergedDependencies = { ...dependencies, ...dependenciesDiff };

await fs.writeFile(
  dependenciesFilePath,
  JSON.stringify(mergedDependencies, null, 2),
  "utf-8"
);

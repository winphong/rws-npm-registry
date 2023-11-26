export interface NpmPackage {
  name: string;
  author: { name: string };
  date: string;
  version: string;
  description: string;
  publisher: { username: string };
}

export interface NpmRegistryDto {
  package: NpmPackage;
  searchScore: number;
}

export interface NpmPkgDetail {
  name: string;
  version: string;
  description: string;
  homepage: string;
  repository: { type: string; url: string };
  icon: string;
  license: string;
  contributors: Array<{ name: string; email: string }>;
  maintainers: Array<{ name: string; email: string }>;
}

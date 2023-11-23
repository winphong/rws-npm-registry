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

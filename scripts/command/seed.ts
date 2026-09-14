import { buildCompanyList } from "@/modules/company-tacker/company";
import { loadUrls, readJsonFile } from "@/utils/data";
import { logger } from "@/utils/logger";

export default async function seedCompanies(file: string): Promise<void> {
  const seedUrls = await readJsonFile<string[]>(file);
  const knownUrls = await loadUrls();

  // buildCompanyList resets .urls to [] for any existing company not
  // represented in the url list it's given, so pass the full known set
  // instead of just the seed URLs to avoid wiping other companies' data.
  const urls = new Set([...knownUrls, ...seedUrls]);
  const companies = await buildCompanyList(urls);

  logger.info({ count: companies.length }, "🌱 Seeded companies");
}

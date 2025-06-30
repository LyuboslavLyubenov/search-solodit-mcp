import type { VulnerabilityReport } from "./types";
import { withRetry } from "./retry";

export default async function getFinding(slug: string) {
  return withRetry(async () => {
    const inputURL = `{"0":"[{\\"slug\\":1},\\"${slug}\\"]"}`;
    const url = `https://solodit.cyfrin.io/api/trpc/findings.getFindingBySlug?batch=1&input=${encodeURIComponent(inputURL)}`;

    console.log(url);
    const response = await fetch(url, {
      headers: {
        'accept': '*/*',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'referer': 'https://solodit.cyfrin.io/',
        'origin': 'https://solodit.cyfrin.io',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const json = await response.json();
    const contentResult = json[0].result.data;
    const obj = eval(`(${contentResult})`);
    return obj as VulnerabilityReport;
  });
}


import type { VulnerabilityReport } from "./types";
import { withRetry } from "./retry";

export default async function getFindings(input: string, page = 1) {
  return withRetry(async () => {
    console.log('input:', input);
    const inputURL = `{"0":"[{\\"filters\\":1,\\"page\\":20},{\\"keywords\\":2,\\"firms\\":3,\\"tags\\":4,\\"forked\\":5,\\"impact\\":6,\\"user\\":-1,\\"protocol\\":-1,\\"reported\\":10,\\"reportedAfter\\":-1,\\"protocolCategory\\":13,\\"minFinders\\":14,\\"maxFinders\\":15,\\"rarityScore\\":16,\\"qualityScore\\":16,\\"bookmarked\\":17,\\"read\\":17,\\"unread\\":17,\\"sortField\\":18,\\"sortDirection\\":19},\\"${input}\\",[],[],[],[7,8,9],\\"HIGH\\",\\"MEDIUM\\",\\"LOW\\",{\\"label\\":11,\\"value\\":12},\\"All time\\",\\"alltime\\",[],\\"1\\",\\"100\\",1,true,\\"Recency\\",\\"Desc\\",${page}]"}`;
    const url = `https://solodit.cyfrin.io/api/trpc/findings.get?batch=1&input=${encodeURIComponent(inputURL)}`;

    const response = await fetch(url, {
      headers: {
        'accept': '*/*',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin'
      }
    });

    const json = await response.json();
    const contentResult = json[0].result.data;
    const obj = eval('(' + contentResult + ')');
    return obj.findings as VulnerabilityReport[];
  });
}


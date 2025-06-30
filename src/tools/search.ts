import zod from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import getFindings from "../get-findings";

const inputSchema = {
  keywords: zod.string().nonempty(),
};
const outputSchema = {
  reportsJSON: zod.string(),
};

type Input = typeof inputSchema;
type Output = typeof outputSchema;

type InputArg = {
  [prop in keyof Input]: zod.infer<Input[prop]>;
};

export default function register(server: McpServer) {
  server.registerTool<Input, Output>(
    "search",
    {
      description: `Searches through solodit bug database for existing vulnerability reports by keywords`,
      inputSchema,
      outputSchema,
    },
    async (args: InputArg) => {
      const keywords = args.keywords.replace(/^"|"$/g, "");
      const findings = await getFindings(keywords);
      const findingsContentShort = findings.map((f) => ({
        title: f.title,
        slug: f.slug,
      }));
      const findingsJSON = JSON.stringify(findingsContentShort);
      return {
        structuredContent: {
          reportsJSON: findingsJSON,
        },
        content: [
          {
            type: "text",
            text: findingsJSON,
          },
        ],
      };
    }
  );
}

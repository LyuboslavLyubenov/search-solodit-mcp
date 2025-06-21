import zod from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import getFinding from "../get-finding";

const inputSchema = {
  slug: zod.string().nonempty(),
};
const outputSchema = {
  content: zod.string(),
};

type Input = typeof inputSchema;
type Output = typeof outputSchema;

type InputArg = {
  [prop in keyof Input]: zod.infer<Input[prop]>;
};

export default function register(server: McpServer) {
  server.registerTool<Input, Output>(
    "get-by-slug",
    {
      description:
        `Gets a solodit vulnerability report based on a slug`,
      inputSchema,
      outputSchema,
    },
    async (args: InputArg) => {
      const slug = args.slug.replace(/^"|"$/g, '');
      const findings = await getFinding(slug);
      const content = findings?.content ?? "Report not found";
      return {
        structuredContent: {
          content: content,
        },
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      };
    }
  );
}

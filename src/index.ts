
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import registerSearch from "./tools/search";
import registerGetByTitle from "./tools/get-by-slug";

async function main() {
  const server = new McpServer({
    name: "SoloditMCPServer",
    version: "0.1.0",
  });

  registerSearch(server);
  registerGetByTitle(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Solodit MCP server running on stdio");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

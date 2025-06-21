
import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import registerSearch from "./tools/search";
import registerGetByTitle from "./tools/get-by-slug";

const app = express();
app.use(express.json());

function getServer() {
  const server = new McpServer({
    name: "SoloditMCPServer",
    version: "0.1.0",
  });

  registerSearch(server);
  registerGetByTitle(server);

  return server;
}

app.post("/mcp", async (req, res) => {
  try {
    const server = getServer();
    const transport: StreamableHTTPServerTransport =
      new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      });
    res.on("close", () => {
      console.log("Request closed");
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
  console.log(`Search solodit MCP HTTP server listening on port ${PORT}`);
  console.error(err);
});

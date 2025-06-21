# Solodit MCP Server

A Model Context Protocol (MCP) server for searching and retrieving Solodit vulnerability reports.

## Features
- Search vulnerability reports by keywords
- Get full report content

## Setup

### Using Docker
1. Build the image:
```shell
docker build -t solodit-mcp .
```
2. Run the container:
```shell
docker run -p 3000:3000 solodit-mcp
```

### Local Setup
1. Install dependencies:
```shell
npm install -g pnpm && pnpm install
```
2. Build and run:
```shell
pnpm build && node dist/index.js
```

## API Usage
The server exposes an MCP endpoint at `POST /mcp` with these tools:

1. **Search Tool** (`search`):
- Input: `{ "keywords": "your search terms" }`
- Returns: JSON array of matching report titles

2. **Get by Title** (`get-by-title`):
- Input: `{ "title": "exact report title" }`
- Returns: Full content of the matching report


## IDE Integration
Add this to your `mcp.json` configuration file:
```json
{
  "mcpServers": {
    "solodit-mcp": {
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

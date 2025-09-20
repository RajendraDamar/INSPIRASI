Summary of MCP servers from user's VS Code `mcp.json` (snapshot Sept 2025)

- oraios/serena
  - Launch: uvx or git+https uvx start-mcp-server with --context and --project inputs
  - Transports: stdio, streamable-http
  - Tools: semantic code navigation and editing: find_symbol, get_symbols_overview, find_referencing_symbols, insert_after_symbol, replace_symbol_body, write_memory, think tools, onboarding and memory support
  - Notes: powerful code-aware MCP; requires serena context/project paths; supports write_memory

- mcp-knowledge-graph (memory)
  - Launch: npx mcp-knowledge-graph --memory-path ${input:memory-path}
  - Tools: aim_create_entities, aim_create_relations, aim_add_observations, aim_search_nodes, aim_read_graph, aim_open_nodes, aim_list_databases
  - Notes: Node 18+, stores .aim files; used as persistent in-chat memory

- sequentialthinking
  - Launch: npx @modelcontextprotocol/server-sequential-thinking
  - Tools: sequential_thinking tool (structured step-by-step reasoning helper)

- mcp-compass
  - Launch: npx @liuyoshio/mcp-compass
  - Tools: discovery & recommendation: can find and recommend MCP servers for tasks

- desktop-commander
  - Launch: npx @wonderwhy-er/desktop-commander@latest (or Docker)
  - Tools: extensive OS-level tools: start_process, interact_with_process, read_process_output, list_processes, kill_process, read_file, write_file, search, edit_block, get_config, set_config_value, list_sessions, process management, docker support
  - Notes: exposes powerful file/terminal/process capabilities; sensitive - use with caution and allowedDirectories config

- zen (BeehiveInnovations/zen-mcp-server)
  - Launch: uvx start (uvx repo run) with env options (DEFAULT_MODEL, DISABLED_TOOLS, THINK modes)
  - Tools: multi-model orchestration - planner, codereview, debug, precommit, thinkdeep, consensus, chat; some tools disabled by default

- ddg-search (duckduckgo)
  - Launch: uvx or npx package duckduckgo-mcp-server (some entries use uvx)
  - Tools: web search integration (DuckDuckGo instant answers)

- upstash/context7
  - Launch: HTTP url https://mcp.context7.com/mcp with preconfigured header key
  - Tools: Context7 hosted MCP endpoint (likely context and knowledge helpers)

- microsoft/playwright-mcp
  - Launch: npx @playwright/mcp@latest or HTTP port mode
  - Tools: browser automation via Playwright: page snapshots, automation tools, caps for pdf/vision, trace/save-session, port/host config

- github/github-mcp-server
  - Launch: https://api.githubcopilot.com/mcp/ (requires Authorization header)
  - Tools: GitHub/Copilot integration; requires auth header

- evalstate/hf-mcp-server (Hugging Face)
  - Launch: npx @llmindset/hf-mcp-server or docker or https://huggingface.co/mcp?login
  - Tools: Hub integration: search models/datasets/spaces, tool enable/disable web UI, STDIO/StreamableHTTP transports

- microsoft/markitdown (markitdown-mcp)
  - Launch: uvx markitdown-mcp (repo reference in mcp.json)
  - Notes: upstream package not found on npm (may be a private/experimental repo); likely provides markdown/code conversion tools

Common patterns/notes:
- Launch methods: npx packages, uvx from git repos, or remote HTTP endpoints (SSE/StreamableHTTP)
- Many MCPs require API keys in env (GEMINI_API_KEY, OPENROUTER_API_KEY, HF tokens, GitHub Authorization)
- Security: desktop-commander and filesystem/process MCPs are powerful and need allowedDirectories and command blocking to be configured
- Useful immediate MCPs: memory (mcp-knowledge-graph) for persistent storage, serena for semantic code edits, desktop-commander for local process/file ops, playwright for browser automation, hf-mcp for hub access

End of summary.
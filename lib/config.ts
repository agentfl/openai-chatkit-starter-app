import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "What can you do?",
    prompt: "What can you do investor assistant?",
    icon: "circle-question",
  },
    {
    label: "What’s the manager’s market outlook?",
    prompt: "Summarize the fund manager’s macro and crypto market outlook from the most recent reports, including expectations for Bitcoin, Ethereum, and altcoins.",
    icon: "globe",
  },
  {
    label: "What are the main risks right now?",
    prompt: "List the key risks or conditions that could challenge the fund’s base case as discussed in recent investor reports.",
    icon: "alert-triangle",
  },
   {
    label: "What catalysts could move crypto markets?",
    prompt: "Summarize the catalysts or macro events (ETFs, rate cuts, legislation) the manager is tracking for potential impact on crypto markets.",
    icon: "zap",
  },
  {
    label: "How are fund operations and staking performing?",
    prompt: "Provide an update on fund operations, including custody platforms, staking performance, and security practices.",
    icon: "database",
  },
];

export const PLACEHOLDER_INPUT = "Ask me about Little Fish and markets.";

export const GREETING = "Hi, I am your Little Fish AI assistant, how can I help you today?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});

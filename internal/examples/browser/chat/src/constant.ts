import type { Region } from "@relevanceai/sdk";

export const REGION = import.meta.env.VITE_REGION as Region;
export const PROJECT = import.meta.env.VITE_PROJECT;
export const WORKFORCE_ID = import.meta.env.VITE_WORKFORCE_ID;
// Uses WORKFORCE_ID if provided, otherwise falls back to AGENT_ID
export const AGENT_ID = WORKFORCE_ID || import.meta.env.VITE_AGENT_ID;

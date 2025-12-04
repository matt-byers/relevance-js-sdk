import { Client, Key } from "@relevanceai/sdk";
import { AGENT_ID, API_KEY, PROJECT, REGION, WORKFORCE_ID } from "@/constant";
import { client } from "@/signals";

if (API_KEY) {
  const key = new Key({
    key: API_KEY,
    region: REGION,
    project: PROJECT,
  });
  client.value = new Client(key);
} else {
  const subjectId = WORKFORCE_ID || AGENT_ID;
  const options = WORKFORCE_ID
    ? { region: REGION, project: PROJECT, workforceId: WORKFORCE_ID }
    : { region: REGION, project: PROJECT, agentId: AGENT_ID };

  Promise.resolve(tryStoredEmbedKey(subjectId))
    .then((key) => key ?? generateEmbedKey(options))
    .then((key) => {
      client.value = new Client(key);
    });
}

async function generateEmbedKey(
  options:
    | { region: typeof REGION; project: string; agentId: string }
    | { region: typeof REGION; project: string; workforceId: string },
) {
  const key = await Key.generateEmbedKey(options);
  const { key: embedKey, taskPrefix } = key.toJSON();
  const subjectId = "agentId" in options ? options.agentId : options.workforceId;

  localStorage.setItem(
    `r-${subjectId}`,
    JSON.stringify({
      embedKey,
      conversationPrefix: taskPrefix,
    }),
  );

  return key;
}

function tryStoredEmbedKey(subjectId: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(`r-${subjectId}`) || "{}");

    if (stored.embedKey && stored.conversationPrefix) {
      return new Key({
        key: stored.embedKey,
        region: REGION,
        project: PROJECT,
        ...(WORKFORCE_ID
          ? { workforceId: WORKFORCE_ID }
          : { agentId: AGENT_ID }),
        taskPrefix: stored.conversationPrefix,
      });
    }
  } catch (_) {
    // silent
  }
}

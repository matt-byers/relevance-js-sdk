import { Client, Key } from "@relevanceai/sdk";
import { AGENT_ID, PROJECT, REGION, WORKFORCE_ID } from "@/constant";
import { client } from "@/signals";

const SUBJECT_ID = WORKFORCE_ID || AGENT_ID;

Promise.resolve(tryStoredEmbedKey())
  .then((key) => key ?? generateEmbedKey())
  .then((key) => {
    client.value = new Client(key);
  });

async function generateEmbedKey() {
  const key = await Key.generateEmbedKey(
    WORKFORCE_ID
      ? { region: REGION, project: PROJECT, workforceId: WORKFORCE_ID }
      : { region: REGION, project: PROJECT, agentId: AGENT_ID },
  );

  const { key: embedKey, taskPrefix } = key.toJSON();
  localStorage.setItem(
    `r-${SUBJECT_ID}`,
    JSON.stringify({
      embedKey: embedKey,
      conversationPrefix: taskPrefix,
    }),
  );

  return key;
}

function tryStoredEmbedKey() {
  try {
    const stored = JSON.parse(localStorage.getItem(`r-${SUBJECT_ID}`));

    if (stored.embedKey && stored.conversationPrefix) {
      return new Key({
        key: stored.embedKey,
        region: REGION,
        project: PROJECT,
        ...(WORKFORCE_ID ? { workforceId: WORKFORCE_ID } : { agentId: AGENT_ID }),
        taskPrefix: stored.conversationPrefix,
      });
    }
  } catch (_) {
    // silent
  }
}

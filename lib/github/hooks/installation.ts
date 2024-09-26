import { EmitterWebhookEvent, Webhooks } from "@octokit/webhooks";

import { sendInstallationDetails } from "../services/user";

type GitHubRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: string;
  private: boolean;
};

export const onInstallationCreated = async (payload: EmitterWebhookEvent<"installation">["payload"]) => {
  const installationId = payload.installation.id;
  const appId = payload.installation.app_id;
  const repos = payload.repositories as GitHubRepository[];

  await sendInstallationDetails(installationId, appId, repos, payload.installation);
};

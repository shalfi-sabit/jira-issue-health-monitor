import api, { route } from "@forge/api";

import { issueChangelogTransformer, projectsTransformer } from "./helper";

export const getDataFromJira = async (url) => {
  try {
    const response = await api.asUser().requestJira(url);
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("getDataFromJira Error: ", err);
    throw err;
  }
};

export const getIssueChangelog = (issueKey) => {
  const response = getDataFromJira(
    route`/rest/api/3/issue/${issueKey}/changelog`
  );
  return issueChangelogTransformer(response);
};

export const sendEmailToAssignee = async (issueKey, notifyBody) => {
  const body = {
    htmlBody: notifyBody,
    subject: "Issue Health Monitor",
    to: {
      voters: false,
      watchers: false,
      groups: [
        {
          name: "jira-software-users",
        },
      ],
      reporter: false,
      assignee: true,
      users: [],
    },
    restrict: {
      permissions: [],
      groups: [],
    },
  };
  const response = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueKey}/notify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

  const result = await response.json();
};

export const getProjects = async () => {
  const response = await getDataFromJira(route`/rest/api/3/project/search`);
  return projectsTransformer(response);
};

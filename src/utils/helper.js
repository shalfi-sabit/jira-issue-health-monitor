import { route } from "@forge/api";
import { format } from "date-fns";

import { getDtataFromJira } from "./api";
import { REQUIRED_ISSUE_FIELDS } from "./constants";

export const pluralizeString = (num) => (num > 1 ? "s" : "");

export const issueChangelogTransformer = (response) => {
  if (!response) return [];
  const filteredResponse = response.values.filter((value) =>
    value.items.some((item) => item.fieldId === "assignee")
  );
  return filteredResponse.length !== 0
    ? filteredResponse
        .map((changelogItem) => ({
          changelogItem,
          items: changelogItem.items.find(
            (item) => item.fieldId === "assignee"
          ),
        }))
        .reverse()
    : [];
};

export const composeIssueUrl = (issueKey, sprintCustomFieldKey) =>
  route`/rest/api/3/issue/${issueKey}?fields=${sprintCustomFieldKey},issuelinks,assignee,statuscategorychangedate,comment`;

export const transfromIssueData = (issueData) => {
  const { fields } = issueData;

  const transformedIssueData = REQUIRED_ISSUE_FIELDS.reduce(
    (issueFieldsMap, field) => {
      issueFieldsMap[field] = fields[field];
      return issueFieldsMap;
    },
    {}
  );
  return transformedIssueData;
};

export const generateLinkedIssuesData = (issuelinks) => {
  const data = Promise.all(
    issuelinks
      .filter((link) => link.hasOwnProperty("inwardIssue"))
      .map(async (link) => {
        if (link.inwardIssue) {
          const assignee = await getDtataFromJira(
            route`/rest/api/3/issue/${link.inwardIssue.key}?fields=assignee&expand=versionedRepresentations`
          );

          return {
            link,
            assignee: assignee
              ? assignee.versionedRepresentations.assignee[1]
              : null,
          };
        }
      })
  );
  return data;
};

export const generateOldSprints = (sprintCustomField, timeConfig) =>
  sprintCustomField
    ? sprintCustomField.reduce(
        (sprintNames, currentSprint) =>
          currentSprint.state === "closed"
            ? [
                ...sprintNames,
                {
                  name: currentSprint.name,
                  startDate: format(
                    new Date(currentSprint.startDate),
                    timeConfig
                  ),
                  boardId: currentSprint.boardId,
                  id: currentSprint.id,
                },
              ]
            : sprintNames,
        []
      )
    : [];

export const composeOldSprintsUrl = (projectKey, sprintId, baseUrl) =>
  `${baseUrl}/secure/RapidBoard.jspa?rapidView=2&projectKey=${projectKey}&view=reporting&chart=sprintRetrospective&sprint=${sprintId}`;

export const mapIssueStatusToLozengeAppearance = (issueStatus) => {
  switch (issueStatus) {
    case "new":
      return "new";
    case "done":
      return "success";
    case "indeterminate":
      return "dafault";
    default:
      return "inprogress";
  }
};

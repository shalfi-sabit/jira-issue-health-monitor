import { route, storage } from "@forge/api";
import ForgeUI, { Fragment, useProductContext, useState } from "@forge/ui";
import { differenceInDays, max } from "date-fns";

import { useModal } from "./hooks/useModal";

import {
  getDtataFromJira,
  getIssueChangelog,
  sendEmailToAssignee,
} from "./utils/api";
import { DEFAULT_CONFIGURATION, STORAGE_KEY_PREFIX } from "./utils/constants";
import {
  composeIssueUrl,
  transfromIssueData,
  generateLinkedIssuesData,
  generateOldSprints,
} from "./utils/helper";

import Status from "./components/status";
import UnhealthyParams from "./components/unhealthy-params";
import Sprint from "./components/sprint";
import Links from "./components/links";
import Activity from "./components/activity";
import Assignee from "./components/assignee";
import Modal from "./components/modal";
import HistoricalAssignees from "./components/historical-assignees";

const App = () => {
  const {
    platformContext: { issueKey, projectKey },
  } = useProductContext();
  const [serverData] = useState(() =>
    getDtataFromJira(route`/rest/api/3/serverInfo`)
  );
  const [fieldsData] = useState(() =>
    getDtataFromJira(route`/rest/api/3/field`)
  );
  const [storageData] = useState(
    async () =>
      (await storage.get(`${STORAGE_KEY_PREFIX}_${projectKey}`)) ||
      DEFAULT_CONFIGURATION
  );

  const [historicalAssignees] = useState(
    storageData.isHistoricalAssigneeVisible && getIssueChangelog(issueKey)
  );
  const sprintCustomFieldKey =
    fieldsData && fieldsData.filter((field) => field.name == "Sprint")[0].key;
  const [issueData] = useState(() =>
    getDtataFromJira(composeIssueUrl(issueKey, sprintCustomFieldKey))
  );
  const transformedIssueData = transfromIssueData(issueData);
  const {
    issuelinks,
    assignee,
    statuscategorychangedate,
    comment: { comments },
    [sprintCustomFieldKey]: sprintCustomField,
  } = transformedIssueData;

  const [linkedIssues] = useState(generateLinkedIssuesData(issuelinks));

  const oldSprints = generateOldSprints(
    sprintCustomField,
    storageData.timeConfig
  );

  const issueSprintAge = oldSprints.length;

  const unresolvedLinks = linkedIssues.filter(
    (issueLink) =>
      issueLink.link.inwardIssue.fields.status.statusCategory.key !== "done"
  );

  const numberOfUnresolvedLinks = unresolvedLinks.length;

  const lastCommentUpdateDate =
    comments.length > 0 && comments[comments.length - 1].updated;

  const daysFromLastUpdate = differenceInDays(
    new Date(),
    max([new Date(lastCommentUpdateDate), new Date(statuscategorychangedate)])
  );

  const isIssueHealthy =
    issueSprintAge < 1 && daysFromLastUpdate < 7 && numberOfUnresolvedLinks < 1;

  const numberofUnhealthyParams = [
    issueSprintAge < 1,
    daysFromLastUpdate < 7,
    numberOfUnresolvedLinks < 1,
  ].reduce(
    (accumulator, currentValue) => accumulator + Number(!currentValue),
    0
  );

  const notifyAssignee = ({ notifyBody }) => {
    sendEmailToAssignee(issueKey, notifyBody);
  };

  const { modalIsOpen, hideModal, showModal } = useModal();

  return (
    <Fragment>
      <Status isIssueHealthy={isIssueHealthy} />
      <UnhealthyParams numberofUnhealthyParams={numberofUnhealthyParams} />
      <Sprint
        sprintCustomField={sprintCustomField}
        oldSprints={oldSprints}
        issueSprintAge={issueSprintAge}
        serverData={serverData}
        projectKey={projectKey}
      />
      <Links
        numberOfUnresolvedLinks={numberOfUnresolvedLinks}
        linkedIssues={linkedIssues}
        serverData={serverData}
      />
      <Activity
        daysFromLastUpdate={daysFromLastUpdate}
        comments={comments}
        lastCommentUpdateDate={lastCommentUpdateDate}
        storageData={storageData}
        statuscategorychangedate={statuscategorychangedate}
      />
      <Assignee
        assignee={assignee}
        storageData={storageData}
        showModal={showModal}
      />
      <Modal
        modalIsOpen={modalIsOpen}
        hideModal={hideModal}
        notifyAssignee={notifyAssignee}
      />
      <HistoricalAssignees
        isHistoricalAssigneeVisible={storageData.isHistoricalAssigneeVisible}
        historicalAssignees={historicalAssignees}
      />
    </Fragment>
  );
};

export default App;

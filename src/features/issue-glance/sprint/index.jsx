import ForgeUI, { Fragment, Text, StatusLozenge, Strong } from "@forge/ui";

import { pluralizeString } from "../../../utils/helper";
import OldSprintsTable from "./old-sprints-table";

const Sprint = ({
  projectKey,
  serverData,
  issueSprintAge,
  oldSprints,
  sprintCustomField,
}) => {
  return (
    <Fragment>
      <Text>
        <StatusLozenge
          text={issueSprintAge}
          appearance={issueSprintAge < 1 ? "inprogress" : "removed"}
        />{" "}
        <Strong>Issue{pluralizeString(issueSprintAge)} carried over</Strong>
      </Text>

      <OldSprintsTable
        sprintCustomField={sprintCustomField}
        oldSprints={oldSprints}
        serverData={serverData}
        projectKey={projectKey}
      />
    </Fragment>
  );
};

export default Sprint;

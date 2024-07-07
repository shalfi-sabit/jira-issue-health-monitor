import ForgeUI, { Fragment, Text, StatusLozenge, Strong } from "@forge/ui";

import { pluralizeString } from "../../utils/helper";

import UnresolvedIssuesTable from "./unresolved-issues";

const Links = ({ numberOfUnresolvedLinks, linkedIssues, serverData }) => (
  <Fragment>
    <Text>
      <StatusLozenge
        text={`${numberOfUnresolvedLinks}`}
        appearance={numberOfUnresolvedLinks > 0 ? "removed" : "inprogress"}
      />{" "}
      <Strong>
        Issue{pluralizeString(numberOfUnresolvedLinks)} in unresolved status
      </Strong>
    </Text>

    <UnresolvedIssuesTable
      linkedIssues={linkedIssues}
      serverData={serverData}
    />
  </Fragment>
);

export default Links;

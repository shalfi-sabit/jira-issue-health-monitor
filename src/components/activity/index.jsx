import ForgeUI, { Fragment, Text, Strong, StatusLozenge } from "@forge/ui";

import ActivityTable from "./activity-table";

const Activity = ({
  daysFromLastUpdate,
  comments,
  lastCommentUpdateDate,
  storageData,
  statuscategorychangedate,
}) => {
  return (
    <Fragment>
      <Text>
        <Strong>Active in the last 7 days:</Strong>{" "}
        <StatusLozenge
          text={`${daysFromLastUpdate >= 7 ? "NO" : "YES"}`}
          appearance={daysFromLastUpdate >= 7 ? "removed" : "inprogress"}
        />
      </Text>
      <ActivityTable
        comments={comments}
        lastCommentUpdateDate={lastCommentUpdateDate}
        storageData={storageData}
        statuscategorychangedate={statuscategorychangedate}
      />
    </Fragment>
  );
};

export default Activity;

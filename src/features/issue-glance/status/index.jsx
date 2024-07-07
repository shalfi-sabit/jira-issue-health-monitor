import ForgeUI, { Fragment, StatusLozenge, Text } from "@forge/ui";

const Status = ({ isIssueHealthy }) => (
  <Fragment>
    <Text>
      <StatusLozenge
        text={`${isIssueHealthy ? "ON" : "OFF"} TRACK`}
        appearance={isIssueHealthy ? "success" : "removed"}
      />
    </Text>
  </Fragment>
);
export default Status;

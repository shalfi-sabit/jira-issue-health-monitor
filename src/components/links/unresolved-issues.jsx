import ForgeUI, {
  Table,
  Head,
  Cell,
  Text,
  Row,
  StatusLozenge,
  User,
  UserGroup,
  Link,
  Fragment,
  Strong,
} from "@forge/ui";

import { mapIssueStatusToLozengeAppearance } from "../../utils/helper";

const UnresolvedIssuesTable = ({ linkedIssues, serverData }) => (
  <Fragment>
    {linkedIssues && linkedIssues.length > 0 && serverData && (
      <Table>
        <Head>
          <Cell>
            <Text>
              <Strong>Issue key</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Status</Strong>
            </Text>
          </Cell>
          <Cell>
            <Text>
              <Strong>Owner</Strong>
            </Text>
          </Cell>
        </Head>
        {linkedIssues.map(
          ({
            link: {
              inwardIssue: {
                key: linkedIssueKey,
                fields: {
                  status: {
                    statusCategory: { key: statusKey },
                  },
                },
              },
            },
            assignee: linkedAssignee,
          }) => (
            <Row>
              <Cell>
                <Text>
                  <Link href={`${serverData.baseUrl}/browse/${linkedIssueKey}`}>
                    {linkedIssueKey}
                  </Link>
                </Text>
              </Cell>
              <Cell>
                <Text>
                  <StatusLozenge
                    text={statusKey}
                    appearance={mapIssueStatusToLozengeAppearance(statusKey)}
                  />
                </Text>
              </Cell>
              <Cell>
                {linkedAssignee && (
                  <UserGroup>
                    <User accountId={linkedAssignee.accountId} />
                  </UserGroup>
                )}
              </Cell>
            </Row>
          )
        )}
      </Table>
    )}
  </Fragment>
);

export default UnresolvedIssuesTable;

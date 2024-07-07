import ForgeUI, {
  Table,
  Head,
  Cell,
  Text,
  Strong,
  Row,
  User,
  Fragment,
} from "@forge/ui";

import { format } from "date-fns";

const HistoricalAssignees = ({
  isHistoricalAssigneeVisible,
  historicalAssignees,
}) => {
  return (
    <Fragment>
      {isHistoricalAssigneeVisible && historicalAssignees && (
        <Table>
          <Head>
            <Cell>
              <Text>
                <Strong>Historical Assignee</Strong>
              </Text>
            </Cell>
            <Cell></Cell>
          </Head>
          {historicalAssignees.map(({ items: { tmpToAccountId }, created }) => (
            <Row>
              <Cell>
                {tmpToAccountId ? (
                  <User accountId={tmpToAccountId} />
                ) : (
                  <Text>Unassigned issue</Text>
                )}
              </Cell>
              <Cell>
                <Text>{format(new Date(created), storageData.timeConfig)}</Text>
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Fragment>
  );
};

export default HistoricalAssignees;

import ForgeUI, { Table, Head, Cell, Text, Row, Strong } from "@forge/ui";

import { format } from "date-fns";

const ActivityTable = ({
  comments,
  lastCommentUpdateDate,
  storageData,
  statuscategorychangedate,
}) => {
  return (
    <Table>
      <Head>
        <Cell>
          <Text>
            <Strong>Activity</Strong>
          </Text>
        </Cell>
        <Cell>
          <Text>
            <Strong>Last change</Strong>
          </Text>
        </Cell>
      </Head>
      {comments.length > 0 && (
        <Row>
          <Cell>
            <Text>Comment</Text>
          </Cell>
          <Cell>
            {lastCommentUpdateDate && (
              <Text>
                {format(
                  new Date(lastCommentUpdateDate),
                  storageData.timeConfig
                )}
              </Text>
            )}
          </Cell>
        </Row>
      )}
      <Row>
        <Cell>
          <Text>Status change</Text>
        </Cell>
        <Cell>
          {statuscategorychangedate && (
            <Text>
              {format(
                new Date(statuscategorychangedate),
                storageData.timeConfig
              )}
            </Text>
          )}
        </Cell>
      </Row>
    </Table>
  );
};

export default ActivityTable;

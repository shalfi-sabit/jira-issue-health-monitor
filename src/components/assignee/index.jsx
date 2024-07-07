import ForgeUI, {
  Table,
  Head,
  Cell,
  Text,
  Strong,
  Row,
  User,
  Button,
  Fragment,
} from "@forge/ui";

const Assignee = ({ assignee, storageData, showModal }) => {
  return (
    <Fragment>
      {storageData.isAssigneeVisible && assignee && (
        <Table>
          <Head>
            <Cell>
              <Text>
                <Strong>Assignee</Strong>
              </Text>
            </Cell>
            <Cell></Cell>
          </Head>
          <Row>
            <Cell>
              <User accountId={assignee.accountId} />
            </Cell>
            {storageData && storageData.isNotifyAssigneeButtonVisible && (
              <Cell>
                <Button text="Notify" onClick={showModal} />
              </Cell>
            )}
          </Row>
        </Table>
      )}
    </Fragment>
  );
};

export default Assignee;

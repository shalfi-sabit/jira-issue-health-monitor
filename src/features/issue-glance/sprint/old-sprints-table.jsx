import ForgeUI, {
  Text,
  Cell,
  Fragment,
  Head,
  Link,
  Row,
  Table,
} from "@forge/ui";

import { composeOldSprintsUrl } from "../../../utils/helper";

const OldSprintsTable = ({
  projectKey,
  serverData,
  oldSprints,
  sprintCustomField,
}) => {
  return (
    <Fragment>
      {sprintCustomField && oldSprints.length > 0 && serverData && (
        <Table>
          <Head>
            <Cell>
              <Text>Sprint name</Text>
            </Cell>
            <Cell>
              <Text>Start date</Text>
            </Cell>
          </Head>

          {oldSprints.map((oldSprint) => (
            <Row>
              <Cell>
                <Text>
                  <Link
                    href={composeOldSprintsUrl(
                      projectKey,
                      oldSprint.id,
                      serverData.baseUrl
                    )}
                  >
                    {oldSprint.name}
                  </Link>
                </Text>
              </Cell>

              <Cell>
                <Text>{oldSprint.startDate}</Text>
              </Cell>
            </Row>
          ))}
        </Table>
      )}
    </Fragment>
  );
};

export default OldSprintsTable;

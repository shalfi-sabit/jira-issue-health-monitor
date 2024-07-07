import ForgeUI, {
  Form,
  Fragment,
  Option,
  Select,
  Strong,
  Text,
} from "@forge/ui";

const ProjectPicker = ({ onProjectPicked, projectData }) => {
  return (
    <Fragment>
      {projectData.lenght !== 0 ? (
        <Fragment>
          <Text>
            In this page you can modify <Strong>Issue health monitor</Strong>{" "}
            configuration for selected project
          </Text>
          <Form onSubmit={onProjectPicked} submitButtonText="Choose">
            <Select label="Choose Project" name="project">
              {projectData.map((project) => (
                <Option label={project.name} value={project.key} />
              ))}
            </Select>
          </Form>
        </Fragment>
      ) : (
        <Text>No configurable projects available</Text>
      )}
    </Fragment>
  );
};

export default ProjectPicker;

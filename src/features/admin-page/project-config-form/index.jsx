import ForgeUI, { Form } from "@forge/ui";

import DateTimeConfig from "./date-time-config";
import AssigneeConfig from "./assignee-config";
import NotificationButtonConfig from "./notification-button-config";
import HistoricalAssigneesConfig from "./historical-assignees-config";

const ProjectConfigForm = ({
  isToggleConfigSelected,
  isDateOptionSelected,
  onProjectConfigSubmit,
}) => {
  return (
    <Form onSubmit={onProjectConfigSubmit}>
      <DateTimeConfig isDateOptionSelected={isDateOptionSelected} />
      <AssigneeConfig isToggleConfigSelected={isToggleConfigSelected} />
      <NotificationButtonConfig
        isToggleConfigSelected={isToggleConfigSelected}
      />
      <HistoricalAssigneesConfig
        isToggleConfigSelected={isToggleConfigSelected}
      />
    </Form>
  );
};

export default ProjectConfigForm;

import ForgeUI, { Toggle } from "@forge/ui";

const AssigneeConfig = ({ isToggleConfigSelected }) => {
  return (
    <Toggle
      {...isToggleConfigSelected("isAssigneeVisible")}
      label="Show/hide Assignee"
      name="isAssigneeVisible"
    />
  );
};

export default AssigneeConfig;

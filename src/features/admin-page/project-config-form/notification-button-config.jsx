import ForgeUI, { Toggle } from "@forge/ui";

const NotificationButtonConfig = ({ isToggleConfigSelected }) => {
  return (
    <Toggle
      {...isToggleConfigSelected("isNotifyAssigneeButtonVisible")}
      label="Show/hide Assignee notification button"
      name="isNotifyAssigneeButtonVisible"
    />
  );
};

export default NotificationButtonConfig;

import ForgeUI, { Toggle } from "@forge/ui";

const HistoricalAssigneesConfig = ({ isToggleConfigSelected }) => {
  return (
    <Toggle
      {...isToggleConfigSelected("isHistorcalAssigneeVisible")}
      label="Show/hide Historical assignees"
      name="isHistorcalAssigneeVisible"
    />
  );
};

export default HistoricalAssigneesConfig;

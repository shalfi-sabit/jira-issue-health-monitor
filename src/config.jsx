import ForgeUI, {
  AdminPage,
  Fragment,
  SectionMessage,
  Text,
  render,
  useEffect,
  useState,
} from "@forge/ui";
import { storage } from "@forge/api";

import { getProjects } from "./utils/api";
import { DEFAULT_CONFIGURATION, STORAGE_KEY_PREFIX } from "./utils/constants";

import ProjectPicker from "./features/admin-page/project-picker";
import ProjectConfigForm from "./features/admin-page/project-config-form";

const Config = () => {
  const [projectConfigState, setProjectConfigState] = useState(undefined);
  const [isProjectConfigSubmitted, setIsProjectConfigSubmitted] =
    useState(false);
  const [projectKey, setProjectKey] = useState(undefined);
  const [projectData, setProjectData] = useState(() => getProjects());

  useEffect(async () => {
    const storageData = await storage.get(
      `${STORAGE_KEY_PREFIX}_${projectKey}`
    );
    setProjectConfigState(storageData || DEFAULT_CONFIGURATION);
  }, [projectKey]);

  const onProjectPicked = ({ project }) => {
    setProjectKey(project);
  };

  const onProjectConfigSubmit = async (projectConfig) => {
    await storage.set(`${STORAGE_KEY_PREFIX}_${projectKey}`, projectConfig);
    setProjectConfigState(projectConfig);
    setIsProjectConfigSubmitted(true);
  };

  const isDateOptionSelected = (value) =>
    projectConfigState &&
    projectConfigState.timeConfig &&
    projectConfigState.timeConfig === value && { defaultSelected: true };

  const isToggleConfigSelected = (name) =>
    projectConfigState && projectConfigState[name] && { defaultChecked: true };

  return (
    <Fragment>
      {isProjectConfigSubmitted && (
        <SectionMessage title="Configuration Saved" appearance="confirmation" />
      )}

      {!projectKey ? (
        <ProjectPicker
          onProjectPicked={onProjectPicked}
          projectData={projectData}
        />
      ) : (
        <ProjectConfigForm
          isDateOptionSelected={isDateOptionSelected}
          isToggleConfigSelected={isToggleConfigSelected}
          onProjectConfigSubmit={onProjectConfigSubmit}
        />
      )}
    </Fragment>
  );
};

export const run = render(
  <AdminPage>
    <Config />
  </AdminPage>
);

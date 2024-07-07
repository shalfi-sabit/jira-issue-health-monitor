import ForgeUI, { render, IssueGlance } from "@forge/ui";
import App from "./app";

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);

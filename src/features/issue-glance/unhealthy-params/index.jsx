import ForgeUI, { Text, Strong } from "@forge/ui";

const UnhealthyParams = ({ numberofUnhealthyParams }) => (
  <Text>
    <Strong>Unhealthy:</Strong> {numberofUnhealthyParams}/3 health issues
  </Text>
);

export default UnhealthyParams;

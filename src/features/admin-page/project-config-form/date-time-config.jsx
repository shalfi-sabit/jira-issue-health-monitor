import ForgeUI, { Option, Select, Text } from "@forge/ui";
import { format } from "date-fns";

import { DATE_TIME_OPTIONS } from "../../../utils/constants";

const DateTimeOption = ({ isDateOptionSelected, option }) => {
  let label;
  const sampleDate = new Date();

  switch (option) {
    case DATE_TIME_OPTIONS.day:
      label = `Day-month-year: ${format(sampleDate, DATE_TIME_OPTIONS.day)}`;
      break;
    case DATE_TIME_OPTIONS.month:
      label = `Month day, year: ${format(sampleDate, DATE_TIME_OPTIONS.month)}`;
      break;
    case DATE_TIME_OPTIONS.year:
      label = `Year, month day: ${format(sampleDate, DATE_TIME_OPTIONS.year)}`;
      break;
    default:
      label = `Year-month-day: ${format(
        sampleDate,
        DATE_TIME_OPTIONS.default
      )}`;
      break;
  }

  return (
    <Option label={label} value={option} {...isDateOptionSelected(option)} />
  );
};

const DateTimeConfig = ({ isDateOptionSelected }) => {
  return (
    <Select label="Date time configuration" name="timeConfig">
      {Object.values(DATE_TIME_OPTIONS).map((option) => (
        <DateTimeOption
          isDateOptionSelected={isDateOptionSelected}
          option={option}
        />
      ))}
    </Select>
  );
};

export default DateTimeConfig;

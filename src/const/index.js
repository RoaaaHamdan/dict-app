import { formatNullValue } from "../utils/dateUtils";

 
export const keys = [
  {
    field: "Keyword",
    editable: true,
    maxWidth: 140,
    filter: true,
  },
  {
    field: "CreationTime",
    valueFormatter: (p) => formatNullValue(p.value),
    filter: true,

  },
  {
    field: "IsEntryAdded",
    valueFormatter: (p) => formatNullValue(p.value),
    filter: true,
    maxWidth: 160,
  },
];

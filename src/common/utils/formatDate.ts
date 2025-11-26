import moment from "moment";

export const formatDate = ({
  date,
  format = "YYYY/MM/DD",
}: {
  date: string | Date;
  format?: "YYYY/MM/DD" | "YYYY-MM-DD";
}) => {
  return moment(date).format(format);
};

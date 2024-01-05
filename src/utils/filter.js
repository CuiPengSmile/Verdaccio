import { rankList } from "@/views/home/dataHelper/dataHelper";

export const filterStatus = (status) => {
  rankList.map((item) => {
    if (item.status === status) {
      return (status = item.message);
    }
  });
};

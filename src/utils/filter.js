import { rankList } from "@/views/home/dataHelper/dataHelper";

export const filterStatus = (status) => {
  rankList.map((item) => {
    if (item.status === status) {
      return (status = item.message);
    }
  });
};

export const normalizeNode = (node) => {
  node.id = node.nodeCode;
  node.name = node.nodeName;
  node.parentId = node.parentCode || "";
};

export interface MessageItem {
  type: MessageType;
  message: string;
  id: number;
}

export type MessageType = "primary" | "warning" | "danger" | "info" | "success";
export type MessageOption = Omit<MessageItem, "id"> & {
  duration?: number;
};

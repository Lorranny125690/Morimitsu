export type ModalMsgProps = {
  show: boolean;
  onClose: () => void;
  message: string;
  type?: "error" | "success";
};
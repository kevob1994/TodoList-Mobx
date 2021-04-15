export default interface ModalProps {
  showModal: boolean;
  onOk?(): void;
  onCancel?(): void;
  idTask?: number
}

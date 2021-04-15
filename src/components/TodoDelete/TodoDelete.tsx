import { DeleteFilled } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import ModalProps from "./../../interfaces/Modal";
import { observer } from "mobx-react";
import storeMobx from "../../store";
import "./index.scss";
import Todo from "../../interfaces/Todo";

export const TodoDelete = observer(
  ({ showModal, onOk, onCancel, idTask }: ModalProps) => {
    let data: Todo[] = storeMobx.todos.map((todo) => ({ ...todo }));
    let task: Todo | undefined = data.find((todo: Todo) => todo.id === storeMobx.id);
    // if (data.length > 0) {
    //   data = data.filter((todo: Todo) => todo.id === storeMobx.id)
    //   console.log()
    //   // task = ()[0].task;
    // }
    console.log(task)
    return (
      <>
        {(data.length > 0 && task)? (
          <Modal
            title="Remove task"
            visible={showModal}
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}
            centered
          >
            <div className="modal-content">
              <DeleteFilled className="icon-modal" />
              <p>Are you sure to delete {task.task}?</p>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
);

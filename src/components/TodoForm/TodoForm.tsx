import Modal from "antd/lib/modal/Modal";
import ModalProps from "./../../interfaces/Modal";
import { Store } from "antd/lib/form/interface";
import { observer } from "mobx-react";
import storeMobx from "../../store";
import "./index.scss";
import { Form, Input, Button, DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

export const TodoForm = observer(
  ({ showModal, onOk, onCancel }: ModalProps) => {
    const onFinish = (values: Store) => {
      if (storeMobx.id !== 0) {
        storeMobx.editTodo(storeMobx.id);
      } else {
        storeMobx.addTodo();
      }
      /*// @ts-ignore */
      onCancel();
    };
    const closeModal = () => {
      /*// @ts-ignore */
      onCancel();
    };
    return (
      <>
        <Modal
          title={(storeMobx.id === 0) ? "Create task" : "Edit task"}
          visible={showModal}
          onOk={onOk}
          onCancel={onCancel}
          destroyOnClose={true}
          footer={[
            <Button key="back" onClick={() => closeModal()}>
              Cancel
            </Button>,
            <Button form="myForm" key="submit" htmlType="submit" type="primary">
              {(storeMobx.id === 0) ? "Create" : "Edit"}
            </Button>,
          ]}
          centered
        >
          <div>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
              id="myForm"
              onFinish={onFinish}
              fields={[
                {
                  name: ["task"],
                  value: storeMobx.newTodo,
                },
                {
                  name: ["date"],
                  value: moment(storeMobx.date),
                },
              ]}
            >
              <Form.Item
                label="Task"
                name="task"
                rules={[
                  { required: true, message: "Please enter your new task!" },
                ]}
              >
                <Input
                  key="task"
                  value={storeMobx.newTodo}
                  onChange={(evt) => (storeMobx.newTodo = evt.target.value)}
                />
              </Form.Item>
              <Form.Item label="Start date" name="date">
                <DatePicker
                  format={dateFormat}
                  value={moment(storeMobx.date)}
                  allowClear={false}
                  onChange={(date) =>
                    (storeMobx.date = moment(date, dateFormat).toDate())
                  }
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
);

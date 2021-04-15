import { Button, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { FormListFieldData } from "antd/lib/form/FormList";
import { TodoDelete } from "../TodoDelete/TodoDelete";
import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import { observer } from "mobx-react";
import storeMobx from "../../store";
import moment from "moment";
import "./index.scss";

export const TodoList = observer(() => {
  const [idTaskSelected, setIdTaskSelected] = useState<number>(0);
  const [isModalVisibleDetele, setIsModalVisibleDetele] = useState<boolean>(
    false
  );
  const [isModalVisibleForm, setIsModalVisibleForm] = useState<boolean>(false);
  const columns: ColumnsType<FormListFieldData> = [
    {
      title: "Task",
      width: "60%",
      dataIndex: "task",
      key: "task",
      fixed: "left",
    },
    {
      title: "Date",
      width: "30%",
      dataIndex: "date",
      key: "date",
      fixed: "left",
    },

    {
      title: "Options",
      key: "operation",
      fixed: "right",
      width: 180,
      render: (data, record: { key: React.Key }) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                setIsModalVisibleForm(true);
                setIdTaskSelected(data.id);
                storeMobx.newTodo = data.task;
                storeMobx.date = data.date;
                storeMobx.id = data.id;
                console.log(storeMobx.newTodo, storeMobx.date, storeMobx.id);
              }}
            >
              <EditFilled className="icon-edit" />
            </Button>
            <Button
              onClick={() => {
                setIsModalVisibleDetele(true);
                setIdTaskSelected(data.id);
                storeMobx.id = data.id;
              }}
            >
              <DeleteFilled className="icon-delete" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleCancelDelete = (): void => {
    setIsModalVisibleDetele(false);
  };

  const handleOkDelete = (): void => {
    storeMobx.deleteTodo(idTaskSelected);
    setIsModalVisibleDetele(false);
  };

  const handleCancelForm = (): void => {
    setIsModalVisibleForm(false);
  };

  const handleOkForm = () => {
    setIsModalVisibleForm(false);
  };

  let data: any[] = storeMobx.todos.map((todo, index) => ({
    ...todo,
    key: index,
    date: moment(todo.date).format("YYYY/MM/DD"),
  }));

  return (
    <>
      <Button
        onClick={() => {
          storeMobx.newTodo = "";
          storeMobx.date = new Date();
          storeMobx.id = 0;
          setIsModalVisibleForm(true);
        }}
        type="primary"
        size="large"
        block
      >
        Add new task
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "25"],
        }}
      />
      <TodoDelete
        showModal={isModalVisibleDetele}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        idTask={idTaskSelected}
      />
      <TodoForm
        showModal={isModalVisibleForm}
        onOk={handleOkForm}
        onCancel={handleCancelForm}
      />
    </>
  );
});

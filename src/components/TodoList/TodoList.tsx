import { Button, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { FormListFieldData } from "antd/lib/form/FormList";
import { TodoDelete } from "../TodoDelete/TodoDelete";
import { useState } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import { observer } from "mobx-react";
import { useDataStore } from "../../store/context";
import moment from "moment";
import "./index.scss";

export const TodoList = observer(() => {
  const store = useDataStore();
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
                store.newTodo = data.task;
                store.date = data.date;
                store.id = data.id;
                console.log(store.newTodo, store.date, store.id);
              }}
            >
              <EditFilled className="icon-edit" />
            </Button>
            <Button
              onClick={() => {
                setIsModalVisibleDetele(true);
                setIdTaskSelected(data.id);
                store.id = data.id;
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
    store.deleteTodo(idTaskSelected);
    setIsModalVisibleDetele(false);
  };

  const handleCancelForm = (): void => {
    setIsModalVisibleForm(false);
  };

  const handleOkForm = () => {
    setIsModalVisibleForm(false);
  };

  let data: any[] = store.todos.map((todo, index) => ({
    ...todo,
    key: index,
    date: moment(todo.date).format("YYYY/MM/DD"),
  }));

  return (
    <>
      <Button
        onClick={() => {
          store.newTodo = "";
          store.date = new Date();
          store.id = 0;
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

import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import "./App.scss";
import { FooterApp } from "./components/FooterApp/FooterApp";
import { HeaderApp } from "./components/HeaderApp/HeaderApp";
import { TodoList } from "./components/TodoList/TodoList";
import { DataStoreProvider } from "./store/context";

function App() {
  return (
    <DataStoreProvider>
      <Layout>
        <HeaderApp />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <TodoList />
        </Content>
        <FooterApp />
      </Layout>
    </DataStoreProvider>
  );
}

export default App;

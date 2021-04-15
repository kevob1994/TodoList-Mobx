import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import "./App.scss";
import { FooterApp } from "./components/FooterApp/FooterApp";
import { HeaderApp } from "./components/HeaderApp/HeaderApp";
import { TodoList } from "./components/TodoList/TodoList";

function App() {
  return (
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
  );
}

export default App;

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./ui/header/Header";
import Footer from "./ui/footer/Footer";
import TodoList from "./ui/todos/TodoList";

export default function Home() {
  return (
    <>
      <h2>Todos</h2>
      <div className="todoapp">
        <Header />
        <TodoList />
        <Footer />
      </div>
    </>
  );
}

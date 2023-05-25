import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import { Fragment } from "react";
// we put fragment since it satisfies React needs for parent component without the need to wrap the component in div
//since in the browser when we inspect it wil appear as nested div in the DOM tree
//short syntax for fragment is just <> </> without the need to import it
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Search } from "./components/Search";

import "./App.css";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then((users) => {
        // or we can write: .then(setUsers)
        setUsers(users);
      })
      .catch((err) => {
        console.log(["Error" + err]);
      });
  }, []);

  return (
    <Fragment>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList users={users} />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;

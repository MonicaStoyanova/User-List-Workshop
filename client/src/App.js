import { useEffect, useState } from "react";
import * as userService from "./services/userService";
import { Fragment } from "react";
// we put fragment since it satisfies React needs for parent component without the need to wrap the component in div
// since in the browser when we inspect it wil appear as nested div in the DOM tree
// short syntax for fragment is just <> </> without the need to import it
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

  // we will look into Reacts' way to deal with forms in the future, here we will use out DOM knowledge
  const onUserCreateSubmit = async (e) => {
    e.preventDefault();

    const formatData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formatData); // it comes from the DOM not from Reacts' virtual DOM

    //send ajax request to server
    const createdUser = await userService.create(data);

    //if successfull add new user to the state
    setUsers((state) => [...state, createdUser]);

    //close dialog: it happens in UserList file
  };

  const onUserUpdateSubmit = async (e, userId) => {
    e.preventDefault();

    const formatData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formatData);

    const updatedUser = await userService.update(userId, data);

    setUsers((state) => state.map((x) => (x._id === userId ? updatedUser : x)));
  };

  const onUserDelete = async (userId) => {
    //delete from server
    await userService.remove(userId);
    //delete from state
    setUsers((state) => state.filter((x) => x._id !== userId));
  };

  return (
    <Fragment>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />
          <UserList
            users={users}
            onUserCreateSubmit={onUserCreateSubmit}
            onUserUpdateSubmit={onUserUpdateSubmit}
            onUserDelete={onUserDelete}
          />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;

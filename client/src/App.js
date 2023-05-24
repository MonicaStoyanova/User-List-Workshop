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
  return (
    <Fragment>
      <Header />
      <main className="main">
        <section class="card users-container">
          <Search />
          <UserList />
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;

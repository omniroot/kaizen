import { Route, Switch } from "wouter";
import { OverviewPage } from "./overview/overview.page.tsx";
import { Header } from "../components/Header/Header.tsx";
import styles from "./router.module.css";

export const Router = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path={"/"} component={OverviewPage} />
        </Switch>
      </main>
    </>
  );
};

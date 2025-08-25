import { BottomNavigation } from "@/components/BottomNavigation/BottomNavigation.tsx";
import { CreateHabitDrawer } from "@/components/CreateHabitDrawer/CreateHabitDrawer.tsx";
import { DaySelectDrawer } from "@/components/DaySelectDrawer/DaySelectDrawer.tsx";
import { Header } from "@/components/Header/Header.tsx";
import { Outlet } from "@tanstack/react-router";
import styles from "./global.layout.module.css";

export const GlobalLayout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <BottomNavigation />
      <DaySelectDrawer />
      <CreateHabitDrawer />
    </>
  );
};

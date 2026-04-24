import {
  getHabitEntriesByDateOptions,
  getHabitsOptions,
} from "@/api/habits/habits.api.ts";
import type { IHabitEntry } from "@/api/data.types.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import styles from "./overview.page.module.css";

const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const asDateKey = (date: Date) => date.toISOString().slice(0, 10);

const buildWeek = (date: Date) => {
  const current = new Date(date);
  const day = current.getDay();
  const normalized = day === 0 ? 7 : day;
  const monday = new Date(current);
  monday.setDate(current.getDate() - (normalized - 1));

  return Array.from({ length: 7 }, (_, index) => {
    const value = new Date(monday);
    value.setDate(monday.getDate() + index);
    return value;
  });
};

export const OverviewPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateKey = asDateKey(selectedDate);
  const week = useMemo(() => buildWeek(selectedDate), [selectedDate]);

  const { data: habits = [] } = useQuery(getHabitsOptions);
  const { data: initialEntries = [] } = useQuery(
    getHabitEntriesByDateOptions(selectedDateKey)
  );

  const [entriesByDate, setEntriesByDate] = useState<Record<string, IHabitEntry[]>>(
    {}
  );

  useEffect(() => {
    setEntriesByDate((prev) => {
      if (prev[selectedDateKey] !== undefined) {
        return prev;
      }

      return {
        ...prev,
        [selectedDateKey]: initialEntries,
      };
    });
  }, [initialEntries, selectedDateKey]);

  const entries = useMemo(() => {
    if (!entriesByDate[selectedDateKey]) {
      return initialEntries;
    }

    return entriesByDate[selectedDateKey];
  }, [entriesByDate, initialEntries, selectedDateKey]);

  const entryByHabitId = useMemo(() => {
    const map: Record<string, IHabitEntry> = {};
    entries.forEach((entry) => {
      map[entry.habit_id] = entry;
    });
    return map;
  }, [entries]);

  const updateEntry = (habitId: string, value: number) => {
    const habit = habits.find((item) => item.id === habitId);
    if (!habit) return;

    setEntriesByDate((prev) => {
      const dateEntries = prev[selectedDateKey] ?? initialEntries;
      const currentEntry = dateEntries.find((entry) => entry.habit_id === habitId);

      const nextEntry: IHabitEntry = currentEntry
        ? {
            ...currentEntry,
            value,
          }
        : {
            id: `local-${selectedDateKey}-${habit.id}`,
            habit_id: habit.id,
            date: selectedDateKey,
            goal: habit.target,
            value,
            unit: habit.unit,
            type: habit.type,
            habit_title: habit.title,
          };

      const withoutCurrent = dateEntries.filter((entry) => entry.habit_id !== habitId);
      return {
        ...prev,
        [selectedDateKey]: [...withoutCurrent, nextEntry],
      };
    });
  };

  const handleToggle = (habitId: string) => {
    const current = entryByHabitId[habitId]?.value ?? 0;
    const nextValue = current > 0 ? 0 : 1;
    updateEntry(habitId, nextValue);
  };

  const handleTimeUpdate = (habitId: string, currentValue: number) => {
    const response = window.prompt("Сколько минут уже сделал?", String(currentValue));
    if (response === null) return;

    const parsed = Number(response.replace(",", "."));
    if (Number.isNaN(parsed) || parsed < 0) return;

    updateEntry(habitId, Math.round(parsed));
  };

  const monthAndYear = selectedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.page}>
      <div className={styles.phone}>
        <header className={styles.top}>
          <h1 className={styles.weekdayTitle}>
            {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}
            <span className={styles.dot} />
          </h1>
          <div className={styles.dateLabel}>
            {monthAndYear}
            <br />
            {selectedDate.getDate()}
          </div>
        </header>

        <div className={styles.weekStrip}>
          {week.map((date, index) => {
            const isActive = asDateKey(date) === selectedDateKey;
            return (
              <button
                key={asDateKey(date)}
                type="button"
                className={`${styles.dayChip} ${isActive ? styles.dayChipActive : ""}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className={styles.dayNum}>{date.getDate()}</div>
                <div className={styles.dayName}>{WEEKDAY_LABELS[index]}</div>
              </button>
            );
          })}
        </div>

        <ul className={styles.list}>
          {habits.map((habit) => {
            const entry = entryByHabitId[habit.id];
            const currentValue = entry?.value ?? 0;
            const goalValue = entry?.goal ?? habit.target;
            const done = currentValue >= goalValue;
            const progress =
              goalValue > 0 ? Math.min((currentValue / goalValue) * 100, 100) : 0;

            return (
              <li key={habit.id} className={styles.row}>
                <div className={styles.left}>
                  <div className={styles.emoji}>{habit.icon}</div>
                  <div className={styles.titleWrap}>
                    <p className={styles.habitName}>{habit.title}</p>
                    <p className={styles.meta}>
                      {habit.type === "toggle"
                        ? done
                          ? "Сделано"
                          : "Не отмечено"
                        : `${currentValue} / ${goalValue} мин`}
                    </p>
                  </div>
                </div>

                <div className={styles.actions}>
                  {habit.type === "toggle" ? (
                    <button
                      type="button"
                      className={`${styles.toggleButton} ${done ? styles.toggleButtonDone : ""}`}
                      onClick={() => handleToggle(habit.id)}
                      aria-label={`toggle-${habit.title}`}
                    >
                      {done ? "✓" : ""}
                    </button>
                  ) : (
                    <>
                      <div className={styles.progress}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        className={styles.timeButton}
                        onClick={() => handleTimeUpdate(habit.id, currentValue)}
                      >
                        ⏱
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <footer className={styles.footer}>
          <button type="button" className={styles.navBtn}>
            ◻
          </button>
          <button type="button" className={`${styles.navBtn} ${styles.navBtnCenter}`}>
            +
          </button>
          <button type="button" className={styles.navBtn}>
            ⚙
          </button>
        </footer>
      </div>
    </section>
  );
};

import { FC, useCallback, useMemo, useState } from 'react';
import { Divider } from '@mantine/core';
import styles from './home.module.css';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import TimerControl from '../../components/TimerControl/TimerControl';
import PomoTimeline from '../../components/Timeline/PomoTimeline';
import Tabs from '../../components/Tab/Tab';
import PomoTally from '../../components/Tally/PomoTally';
import Timer from '../../components/Timer/Timer';
import Todo from '../../components/Todo/Todo';
import TimeUpModal from '../../components/Modal/TimeUpModal';
import Pomodoro from '../Pomodoro/Pomodoro';
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';
import Faq from '../Faq/Faq';
import AiDrawer from '../../components/Drawer/AiDrawer';

interface TimerLength {
  session: number;
  shortBreak: number;
  longBreak: number;
}

const Home: FC = () => {
  const alarm = useMemo(() => new Audio('/assets/sounds/alarm.mp3'), []);
  const [sessionStatus, setSessionStatus] = useState({
    count: 0,
    time: '',
  });
  const currentTime = new Date();
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskCount, setTaskCount] = useState(3);
  const [selectedTab, setSelectedTab] = useState(0);
  const [timerReset, setTimerReset] = useState(false);
  const [timerLength, setTimerLength] = useState<TimerLength>({
    session: 10,
    shortBreak: 3,
    longBreak: 5,
  });
  const [cycleCount, setCycleCount] = useState(0);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState('Home');

  const cycleTab = useCallback(() => {
    if (selectedTab === 0) {
      if (cycleCount < 3) {
        setSelectedTab(1);
        setTimelineIndex(cycleCount < 1 ? 1 : 2);
        setCycleCount(cycleCount + 1);
      } else {
        setSelectedTab(2);
        setTimelineIndex(3);
        setCycleCount(0);
      }
    } else {
      setSelectedTab(0);
      setTimelineIndex(cycleCount > 0 ? 2 : 0);
    }
  }, [selectedTab, cycleCount]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setTimerReset(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    cycleTab();
    setTimerReset(true);
    if (selectedTab === 0) {
      setSessionStatus((prev) => ({
        count: prev.count + 1,
        time: currentTime.toLocaleTimeString(),
      }));
    }
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  return (
    <>
      <Header onDrawerOpen={handleDrawerOpen} section={handleSectionChange} />
      <main>
        <section>
          <div className={styles['grid-container']}>
            <div className={`${styles['grid-item']} ${styles['item1']}`}>
              <Tabs selected={selectedTab} onSelect={setSelectedTab} />
              <Timer
                selectedTab={selectedTab}
                timerLength={timerLength}
                modalOpen={handleModalOpen}
                reset={timerReset}
              />
            </div>
            <div className={`${styles['grid-item']} ${styles['item2']}`}>
              <Todo sessionStatus={sessionStatus} setTaskCount={setTaskCount} />
            </div>
            <div className={`${styles['grid-item']} ${styles['item3']}`}>
              <TimerControl
                timerLength={timerLength}
                setTimerLength={setTimerLength}
              />
              <PomoTimeline
                activeIndex={timelineIndex}
                cycleCount={cycleCount}
              />
            </div>
          </div>
        </section>

        <section>
          <div className={styles['tally-container']}>
            <PomoTally
              title="Task List"
              value={0}
              color="#f77170"
              subtitle="Today's Ongoing tasks"
              taskCount={taskCount}
            />
            <PomoTally
              title="Task Completed"
              value={0}
              color="#36c890"
              subtitle="Total completed tasks"
            />
            <PomoTally
              title="Current Streak"
              value={0}
              color="#f9a976"
              subtitle="Current streak of daily productivity"
            />
            <PomoTally
              title="Longest Streak"
              value={0}
              color="#2083b0"
              subtitle="Longest streak of daily productivity"
            />
          </div>
        </section>

        <Divider size="xl" />

        <section>
          {currentSection === 'Home' && <Pomodoro alarmSound={alarm} />}
          {currentSection === 'Privacy' && <Privacy />}
          {currentSection === 'Terms' && <Terms />}
          {currentSection === 'FAQ' && <Faq />}
        </section>
      </main>
      <Footer section={handleSectionChange} />
      <TimeUpModal
        opened={modalOpen}
        close={handleModalClose}
        alarmSound={alarm}
        selectedTab={selectedTab}
      />
      <AiDrawer opened={drawerOpen} close={handleDrawerClose} />
    </>
  );
};

export default Home;
export type { TimerLength };

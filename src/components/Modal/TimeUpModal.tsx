import { FC, useEffect } from 'react';
import { IconAlarm } from '@tabler/icons-react';
import { Modal } from '@mantine/core';
import styles from './timeUpModal.module.css';
import { ContinueBtn } from '..';

interface TimeUpModalProps {
  opened: boolean;
  close: () => void;
  alarmSound: HTMLAudioElement;
  selectedTab: number;
}

const TimeUpModal: FC<TimeUpModalProps> = ({
  opened,
  close,
  alarmSound,
  selectedTab,
}) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const alarmColor =
    selectedTab === 0 ? '#f77170' : selectedTab === 1 ? '#36c890' : '#2083b0';

  const playAlarm = () => {
    alarmSound.loop = true;
    alarmSound.addEventListener(
      'canplaythrough',
      () => {
        alarmSound.play();
      },
      { once: true }
    );
    alarmSound.load();

    // Show a notification with sound if permissions are granted
    if (Notification.permission === 'granted') {
      new Notification("Time's up!", {
        body: 'Tap to continue.',
        icon: '/assets/images/icon.png',
      });
    }
  };

  useEffect(() => {
    // Request notification permissions if they haven't been granted
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (opened) {
      playAlarm();
      scrollToTop();
    }
  }, [opened]);

  const stopAlarm = () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmSound.loop = false;
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={stopAlarm}
      withCloseButton={false}
      transitionProps={{ transition: 'rotate-left' }}
      zIndex={4000}
      radius={20}
      closeOnClickOutside={false}
      closeOnEscape={false}
      shadow="0 0 12px rgba(24, 94, 224, .7), 0 0 12px rgba(24, 94, 224, .7)"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 2,
      }}
    >
      <div className={styles['button-container']}>
        <div className={`${styles['circle-btn']} ${styles['red']}`} />
        <div className={`${styles['circle-btn']} ${styles['yellow']}`} />
        <div className={`${styles['circle-btn']} ${styles['green']}`} />
      </div>
      <div className={styles['modal-wrapper']}>
        <h3>
          <span>Time’s up!</span> <span>Tap Continue to proceed.</span>
          <IconAlarm
            className={styles.vibrating}
            color={alarmColor}
            size="3rem"
            style={{ marginBottom: '-1rem' }}
          />
        </h3>
        <ContinueBtn onClick={stopAlarm} color={alarmColor} />
      </div>
    </Modal>
  );
};

export default TimeUpModal;

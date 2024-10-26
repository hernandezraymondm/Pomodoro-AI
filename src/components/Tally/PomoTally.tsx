import { FC } from 'react';
import styles from './pomoTally.module.css';
import { Badge } from '@mantine/core';

interface PomoTallyProps {
  title: string;
  value: number;
  color: string;
  subtitle?: string;
}

const PomoTally: FC<PomoTallyProps> = ({
  title,
  value,
  color,
  subtitle = '',
}) => {
  return (
    <div className={styles['tally-wrapper']}>
      <h2>{title}</h2>
      <Badge className={styles['tally-badge']} color={color} size="xl">
        {value}
      </Badge>
      <h5>{subtitle}</h5>
    </div>
  );
};

export default PomoTally;
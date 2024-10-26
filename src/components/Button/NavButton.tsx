import { Link } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import Styles from './styles/navButton.module.css';

interface NavButtonProps {
  to: string;
  icon: ReactNode;
  text: string;
  className?: string;
}

const NavButton: FC<NavButtonProps> = ({ to, icon, text, className = '' }) => {
  return (
    <li>
      <Link to={to} className={`${Styles['nav-btn']} ${className}`}>
        <span className={Styles['nav-wrapper']}>
          {icon}
          <span className={Styles['nav-text']}>{text}</span>
        </span>
      </Link>
    </li>
  );
};

export default NavButton;
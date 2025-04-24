// src/elements/container-query-button.tsx
import React from 'react';
import styles from './container-query-button.module.css';
import { cn } from '@/lib/utils';

const ContainerQueryButton = () => {
  return (
    <div className={styles.buttonWrapper}>
      <a href="#" className={styles.buttonLink}>
        <span>Hover Me</span>

        {/* Top Left Corner -> Top Right */}
        <span className={cn(styles.corner, styles.topLeft)}>+</span>

        {/* Top Right Corner -> Bottom Right */}
        <span className={cn(styles.corner, styles.topRight)}>+</span>

        {/* Bottom Right Corner -> Bottom Left */}
        <span className={cn(styles.corner, styles.bottomRight)}>+</span>

        {/* Bottom Left Corner -> Top Left */}
        <span className={cn(styles.corner, styles.bottomLeft)}>+</span>
      </a>
    </div>
  );
};

export default ContainerQueryButton;
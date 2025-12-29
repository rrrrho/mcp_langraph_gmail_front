import { Text, type MantineFontSize, type StyleProp } from '@mantine/core';
import './GradientText.css';
import { type ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  size?: StyleProp<MantineFontSize>;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  showBorder = false,
  size = 'md'
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`
  };

  return (
    <div className={`animated-gradient-text ${className}`}>
      {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
      <div className="text-content" style={gradientStyle}>
        <Text 
        span
        fz={size}
        inherit
        style={{ color: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
          {children}
        </Text>
      </div>
    </div>
  );
}

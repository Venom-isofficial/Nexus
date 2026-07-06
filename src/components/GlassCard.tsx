import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', style, onClick, onDoubleClick }) => {
  return (
    <div 
      className={`glass-card ${className}`} 
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', ...style }}
    >
      {children}
    </div>
  );
};

export default GlassCard;

import React from 'react';

interface LedTickerProps {
  materiality?: string;
  corroborationCount?: number;
  sectorName?: string;
}

const LedTicker: React.FC<LedTickerProps> = ({ materiality, corroborationCount, sectorName }) => {
  const parts = [];
  if (materiality) {
    const level = materiality.charAt(0).toUpperCase() + materiality.slice(1);
    parts.push(`⚡ ${level} Impact`);
  }
  if (corroborationCount && corroborationCount > 0) {
    parts.push(`Confirmed by ${corroborationCount} source${corroborationCount > 1 ? 's' : ''}`);
  }
  if (sectorName) {
    parts.push(sectorName);
  }

  const message = parts.join(' · ');

  if (!message) return null;

  return (
    <div className="led-ticker-container">
      <span className="led-ticker-text">
        {message}
      </span>
    </div>
  );
};

export default LedTicker;

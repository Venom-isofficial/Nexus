import React from 'react';

export type SentimentType = 'bullish' | 'bearish' | 'neutral';

interface SentimentBadgeProps {
  sentimentLabel: SentimentType | string;
}

const SENTIMENT_MAP: Record<string, { label: string; color: string }> = {
  bullish: { label: '🟢 Bullish', color: 'var(--color-bullish)' },
  bearish: { label: '🔴 Bearish', color: 'var(--color-bearish)' },
  neutral: { label: '⚪ Neutral', color: 'var(--color-neutral)' },
};

const SentimentBadge: React.FC<SentimentBadgeProps> = ({ sentimentLabel }) => {
  const key = (sentimentLabel || 'neutral').toLowerCase();
  const config = SENTIMENT_MAP[key] || SENTIMENT_MAP['neutral'];

  return (
    <span
      style={{
        backgroundColor: 'rgba(11, 26, 18, 0.8)',
        color: config.color,
        border: `1px solid ${config.color}`,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        display: 'inline-block',
      }}
    >
      {config.label}
    </span>
  );
};

export default SentimentBadge;

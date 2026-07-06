import React from 'react';

interface ReadThroughNode {
  ticker: string;
  correlation: number;
  relationship: string;
}

interface ReadThroughRowProps {
  nodes?: ReadThroughNode[];
}

const ReadThroughRow: React.FC<ReadThroughRowProps> = ({ nodes }) => {
  if (!Array.isArray(nodes) || nodes.length === 0) return null;

  return (
    <div
      className="hide-scrollbar"
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '8px',
        paddingBottom: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      {nodes.map((node, i) => (
        <span
          key={i}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            color: '#fff',
            display: 'inline-block',
          }}
        >
          {node.ticker} <span style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold' }}>{node.correlation}</span>
        </span>
      ))}
    </div>
  );
};

export default ReadThroughRow;

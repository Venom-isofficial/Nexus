import React from 'react';
import { IonIcon } from '@ionic/react';
import { starOutline, star } from 'ionicons/icons';
import { AssetData } from '../hooks/useMarketData';
import { ResponsiveContainer, LineChart, Line, YAxis } from 'recharts';
import { useHistory } from 'react-router-dom';

interface AssetCardProps {
  asset: AssetData;
  isWatchlisted?: boolean;
  onToggleWatchlist?: (assetId: string) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, isWatchlisted = false, onToggleWatchlist }) => {
  const history = useHistory();
  const isPositive = asset.change >= 0;
  const color = isPositive ? 'var(--ion-color-primary)' : 'var(--ion-color-danger)';

  const handleCardClick = () => {
    history.push(`/app/finance/${asset.ticker.toLowerCase()}`);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWatchlist) {
      onToggleWatchlist(asset.id);
    }
  };

  // Find min and max for the sparkline y-axis
  const minPrice = Math.min(...asset.history.map(d => d.price));
  const maxPrice = Math.max(...asset.history.map(d => d.price));

  return (
    <div 
      onClick={handleCardClick}
      style={{ 
        backgroundColor: '#11231a', 
        borderRadius: '16px', 
        padding: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{ flex: '1 1 auto', minWidth: 0, paddingRight: '8px' }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>
          {asset.ticker}
        </h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {asset.name}
        </p>
      </div>

      <div style={{ width: '80px', height: '40px', marginRight: '16px', flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={asset.history}>
            <YAxis domain={[minPrice, maxPrice]} hide />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flexShrink: 0, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div style={{ 
          backgroundColor: isPositive ? 'rgba(165,237,114,0.15)' : 'rgba(239,68,68,0.15)',
          color: color,
          padding: '2px 8px',
          borderRadius: '8px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {isPositive ? '+' : ''}{asset.change.toFixed(2)}%
        </div>
      </div>

      <div 
        onClick={handleWatchlistClick}
        style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <IonIcon 
          icon={isWatchlisted ? star : starOutline} 
          style={{ fontSize: '20px', color: isWatchlisted ? 'var(--ion-color-warning)' : 'rgba(255,255,255,0.3)' }} 
        />
      </div>
    </div>
  );
};

export default AssetCard;

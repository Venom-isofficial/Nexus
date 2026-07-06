import React, { useMemo } from 'react';
import { IonPage, IonContent, IonIcon, IonButton, useIonToast } from '@ionic/react';
import { arrowBackOutline, starOutline, star } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useMarketData } from '../hooks/useMarketData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const AssetDetail: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const history = useHistory();
  const [present] = useIonToast();
  
  // Initialize market data hook just to get the asset by ticker
  const { getAssetById } = useMarketData();
  const asset = getAssetById(ticker);

  const isPositive = asset ? asset.change >= 0 : true;
  const color = isPositive ? 'var(--ion-color-primary)' : 'var(--ion-color-danger)';
  const lightColor = isPositive ? 'rgba(165,237,114,0.2)' : 'rgba(239,68,68,0.2)';

  // Generate a much more detailed history for the large chart just for this view
  const detailedHistory = useMemo(() => {
    if (!asset) return [];
    const history = [];
    let currentPrice = asset.price * 0.95; 
    for (let i = 0; i < 60; i++) {
      const change = 1 + (Math.random() * 0.04 - 0.02);
      currentPrice = currentPrice * change;
      history.push({ time: `Day ${60 - i}`, price: currentPrice });
    }
    history[59].price = asset.price;
    return history;
  }, [asset]);

  if (!asset) {
    return (
      <IonPage>
        <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
          <div style={{ padding: '60px 16px', color: '#fff' }}>
            <h2>Asset not found</h2>
            <IonButton onClick={() => history.goBack()}>Go Back</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const minPrice = Math.min(...detailedHistory.map(d => d.price));
  const maxPrice = Math.max(...detailedHistory.map(d => d.price));

  const handleTrade = (type: 'buy' | 'sell') => {
    present({ message: `${type.toUpperCase()} order placed for ${asset.ticker}`, duration: 2000, color: 'success' });
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        
        {/* Header */}
        <div style={{ 
          padding: '40px 16px 20px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: 'rgba(11, 26, 18, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 10
        }}>
          <IonIcon 
            icon={arrowBackOutline} 
            style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} 
            onClick={() => history.goBack()}
          />
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
            {asset.ticker}
          </div>
          <IonIcon 
            icon={starOutline} 
            style={{ fontSize: '24px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} 
          />
        </div>

        {/* Price Info */}
        <div style={{ padding: '20px 16px' }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: '4px' }}>
            {asset.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px' }}>
            <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 'bold', color: '#fff', letterSpacing: '-1px' }}>
              ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <div style={{ 
              backgroundColor: lightColor,
              color: color,
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {isPositive ? '+' : ''}{asset.change.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Large Chart */}
        <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={detailedHistory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis domain={[minPrice * 0.98, maxPrice * 1.02]} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#11231a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke={color} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div style={{ padding: '32px 16px 120px 16px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>Market Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: '#11231a', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '4px' }}>Market Cap</div>
              <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{asset.marketCap || 'N/A'}</div>
            </div>
            <div style={{ backgroundColor: '#11231a', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '4px' }}>Volume (24h)</div>
              <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>{asset.volume24h || 'N/A'}</div>
            </div>
            <div style={{ backgroundColor: '#11231a', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '4px' }}>Category</div>
              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{asset.category}</div>
            </div>
            <div style={{ backgroundColor: '#11231a', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '4px' }}>Sub-Category</div>
              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{asset.subCategory || 'N/A'}</div>
            </div>
          </div>

          {/* Trade Buttons */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <IonButton 
              expand="block" 
              onClick={() => handleTrade('sell')}
              style={{ flex: 1, '--background': 'rgba(255,255,255,0.05)', '--color': '#fff', fontWeight: 'bold', '--border-radius': '12px', margin: 0 }}
            >
              Sell
            </IonButton>
            <IonButton 
              expand="block" 
              onClick={() => handleTrade('buy')}
              style={{ flex: 1, '--background': 'var(--ion-color-primary)', '--color': '#0b1a12', fontWeight: 'bold', '--border-radius': '12px', margin: 0 }}
            >
              Buy
            </IonButton>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AssetDetail;

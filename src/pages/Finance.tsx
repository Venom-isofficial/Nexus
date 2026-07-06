import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonIcon, IonChip, IonLabel } from '@ionic/react';
import { searchOutline, filterOutline } from 'ionicons/icons';
import { useMarketData } from '../hooks/useMarketData';
import AssetCard from '../components/AssetCard';

const CATEGORIES = ['All', 'Stocks', 'Crypto', 'Forex', 'Commodities', 'Indices'];

const Finance: React.FC = () => {
  const { 
    assets, 
    searchQuery, setSearchQuery, 
    category, setCategory, 
    subCategory, setSubCategory, 
    availableSubCategories 
  } = useMarketData();

  // Basic mock watchlist state for UI demonstration
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(['1', '6']));

  const handleToggleWatchlist = (id: string) => {
    setWatchlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        
        {/* Header Section */}
        <div style={{ padding: '60px 16px 20px 16px', zIndex: 11, position: 'relative' }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            Markets Hub
          </div>
          <h1 style={{ margin: '4px 0 16px 0', fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            Asset Explorer
          </h1>

          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: '16px',
            padding: '0 16px',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <IonIcon icon={searchOutline} style={{ color: 'rgba(255,255,255,0.5)', marginRight: '8px' }} />
            <IonInput 
              value={searchQuery}
              onIonInput={e => setSearchQuery(e.detail.value!)}
              placeholder="Search assets, symbols..."
              style={{ '--color': '#fff', '--placeholder-color': 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}
            />
          </div>

          {/* Main Category Filters */}
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '8px' }}>
            {CATEGORIES.map(cat => (
              <IonChip 
                key={cat} 
                color={category === cat ? 'primary' : 'light'}
                outline={category !== cat}
                onClick={() => setCategory(cat)}
                style={{ 
                  backgroundColor: category === cat ? 'var(--ion-color-primary)' : 'rgba(255,255,255,0.05)', 
                  borderColor: category === cat ? 'transparent' : 'rgba(255,255,255,0.1)',
                  padding: '0 16px',
                  borderRadius: '20px',
                  minHeight: '28px',
                  margin: 0
                }}
              >
                <IonLabel style={{ color: category === cat ? '#0b1a12' : '#fff', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat}</IonLabel>
              </IonChip>
            ))}
          </div>

          {/* Sub-Category Filters */}
          {availableSubCategories.length > 0 && (
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '12px' }}>
              <IonIcon icon={filterOutline} style={{ color: 'var(--ion-color-primary)', fontSize: '16px', marginTop: '6px' }} />
              <IonChip 
                color={subCategory === 'All' ? 'primary' : 'light'}
                outline={subCategory !== 'All'}
                onClick={() => setSubCategory('All')}
                style={{ 
                  backgroundColor: subCategory === 'All' ? 'rgba(165,237,114,0.1)' : 'transparent', 
                  borderColor: subCategory === 'All' ? 'rgba(165,237,114,0.3)' : 'rgba(255,255,255,0.1)',
                  padding: '0 12px',
                  borderRadius: '12px',
                  minHeight: '24px',
                  margin: 0
                }}
              >
                <IonLabel style={{ color: subCategory === 'All' ? 'var(--ion-color-primary)' : 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase' }}>All</IonLabel>
              </IonChip>
              {availableSubCategories.map(subCat => (
                <IonChip 
                  key={subCat} 
                  color={subCategory === subCat ? 'primary' : 'light'}
                  outline={subCategory !== subCat}
                  onClick={() => setSubCategory(subCat)}
                  style={{ 
                    backgroundColor: subCategory === subCat ? 'rgba(165,237,114,0.1)' : 'transparent', 
                    borderColor: subCategory === subCat ? 'rgba(165,237,114,0.3)' : 'rgba(255,255,255,0.1)',
                    padding: '0 12px',
                    borderRadius: '12px',
                    minHeight: '24px',
                    margin: 0
                  }}
                >
                  <IonLabel style={{ color: subCategory === subCat ? 'var(--ion-color-primary)' : 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase' }}>{subCat}</IonLabel>
                </IonChip>
              ))}
            </div>
          )}
        </div>

        {/* Asset List */}
        <div style={{ padding: '0 16px 120px 16px' }}>
          {assets.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', marginTop: '40px' }}>
              No assets found matching your criteria.
            </div>
          ) : (
            assets.map(asset => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                isWatchlisted={watchlist.has(asset.id)}
                onToggleWatchlist={handleToggleWatchlist}
              />
            ))
          )}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Finance;

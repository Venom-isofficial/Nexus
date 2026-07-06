import React, { useState } from 'react';
import { IonPage, IonContent, IonIcon, IonSpinner, IonChip, IonLabel, useIonToast } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bookmarkOutline, bookmark as bookmarkSolid, shareSocialOutline } from 'ionicons/icons';
import { Share } from '@capacitor/share';
import { useNews, NewsArticle } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import GlassCard from '../components/GlassCard';
import CategoryBadge from '../components/CategoryBadge';
import SentimentBadge from '../components/SentimentBadge';
import LedTicker from '../components/LedTicker';
import ReadThroughRow from '../components/ReadThroughRow';

import 'swiper/css';

const CATEGORIES = ['All', 'Macro', 'Rating', 'M&A', 'Regulatory', 'Management', 'Product', 'Other'];

const NewsCard: React.FC<{ 
  article: NewsArticle; 
  isBookmarked: boolean; 
  onToggleBookmark: (a: NewsArticle) => void;
}> = ({ article, isBookmarked, onToggleBookmark }) => {
  const [present] = useIonToast();
  
  const handleShare = async () => {
    try {
      const takeaways = Array.isArray(article.keyTakeaways) ? article.keyTakeaways : [];
      const bullets = takeaways.map(t => `• ${t}`).join('\n') || '';
      const text = `${article.headline}\n\n${bullets}\n\n— via Nexus Finance`;
      await Share.share({
        title: article.headline,
        text: text,
        dialogTitle: 'Share this insight',
      });
    } catch (e: any) {
      if (e.message !== 'Share canceled') {
         present({ message: 'Error sharing article', duration: 2000, color: 'danger' });
      }
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleBookmark(article);
  };

  const takeaways = Array.isArray(article.keyTakeaways) ? article.keyTakeaways : [];
  const sources = Array.isArray(article.sources) ? article.sources : [];

  return (
    <div className="reel-slide" onDoubleClick={handleDoubleTap}>
      <GlassCard className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <CategoryBadge category={article.category} />
            <SentimentBadge sentimentLabel={article.sentimentLabel} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <IonIcon 
              icon={shareSocialOutline} 
              style={{ fontSize: '24px', cursor: 'pointer', color: '#fff' }} 
              onClick={handleShare}
            />
            <IonIcon 
              icon={isBookmarked ? bookmarkSolid : bookmarkOutline} 
              style={{ fontSize: '24px', cursor: 'pointer', color: isBookmarked ? 'var(--ion-color-primary)' : '#fff' }} 
              onClick={() => onToggleBookmark(article)}
            />
          </div>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '8px 0', lineHeight: 1.3 }}>
          {article.headline}
        </h2>

        {sources.length > 0 && (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
            via {sources.join(', ')}
          </p>
        )}

        <div style={{ margin: '8px 0' }}>
          {takeaways.map((takeaway, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '1rem', lineHeight: 1.4 }}>
              <span style={{ color: 'var(--ion-color-primary)' }}>•</span>
              <span style={{ color: '#e0e0e0' }}>{takeaway}</span>
            </div>
          ))}
        </div>

        <ReadThroughRow nodes={article.readThrough} />
        
        {(article.materiality || article.corroborationCount > 0) && (
          <LedTicker 
            materiality={article.materiality} 
            corroborationCount={article.corroborationCount} 
          />
        )}
      </GlassCard>
    </div>
  );
};

const Home: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { news, loading, loadMore } = useNews(filter);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const handleSlideChange = (swiper: any) => {
    // If we're 2 slides away from the end, load more
    if (swiper.isEnd || swiper.activeIndex >= news.length - 3) {
      loadMore();
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        
        {/* Floating header over swiper */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '40px 16px 12px 16px',
          background: 'linear-gradient(to bottom, rgba(11, 26, 18, 1) 0%, rgba(11, 26, 18, 0.85) 60%, rgba(11, 26, 18, 0) 100%)',
          zIndex: 11,
          pointerEvents: 'none'
        }}>
          <div style={{ pointerEvents: 'auto' }}>
            <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              Financial Journalism
            </div>
            <h1 style={{ margin: '4px 0 12px 0', fontSize: '1.6rem', fontWeight: 'bold', color: '#fff' }}>
              Nexus Editorial
            </h1>
            <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {CATEGORIES.map(cat => (
                <IonChip 
                  key={cat} 
                  color={filter === cat ? 'primary' : 'light'}
                  outline={filter !== cat}
                  onClick={() => setFilter(cat)}
                  style={{ 
                    backgroundColor: filter === cat ? 'var(--ion-color-primary)' : 'rgba(255,255,255,0.05)', 
                    borderColor: filter === cat ? 'transparent' : 'rgba(255,255,255,0.1)',
                    padding: '0 16px',
                    borderRadius: '20px',
                    minHeight: '28px',
                    margin: 0
                  }}
                >
                  <IonLabel style={{ color: filter === cat ? '#0b1a12' : '#fff', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat}</IonLabel>
                </IonChip>
              ))}
            </div>
          </div>
        </div>

        {loading && news.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IonSpinner color="primary" />
          </div>
        ) : news.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--ion-color-medium)' }}>
            <p>No news found for this category.</p>
          </div>
        ) : (
          <Swiper
            direction="vertical"
            className="reel-swiper"
            onSlideChange={handleSlideChange}
            resistanceRatio={0}
          >
            {news.map(article => (
              <SwiperSlide key={article.id}>
                <NewsCard 
                  article={article} 
                  isBookmarked={isBookmarked(article.id)}
                  onToggleBookmark={toggleBookmark}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;

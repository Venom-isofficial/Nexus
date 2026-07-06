import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonSpinner } from '@ionic/react';
import { useBookmarks } from '../hooks/useBookmarks';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { NewsArticle } from '../hooks/useNews';
import CategoryBadge from '../components/CategoryBadge';
import SentimentBadge from '../components/SentimentBadge';

const Bookmarks: React.FC = () => {
  const { bookmarks, loading } = useBookmarks();
  const [fullArticles, setFullArticles] = useState<Record<string, NewsArticle>>({});
  const [fetchingFull, setFetchingFull] = useState(false);

  useEffect(() => {
    // Attempt to fetch full documents for online view
    const fetchFullData = async () => {
      setFetchingFull(true);
      const fetched: Record<string, NewsArticle> = {};
      
      for (const id of Object.keys(bookmarks)) {
        try {
          const docRef = doc(db, 'news', id);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            fetched[id] = { id: snap.id, ...snap.data() } as NewsArticle;
          }
        } catch (e) {
          console.error("Offline or error fetching full article:", e);
        }
      }
      
      setFullArticles(fetched);
      setFetchingFull(false);
    };

    if (Object.keys(bookmarks).length > 0) {
      fetchFullData();
    }
  }, [bookmarks]);

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        
        {/* Custom Header Section */}
        <div style={{ padding: '60px 16px 20px 16px', zIndex: 11, position: 'relative' }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            Saved Articles
          </div>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            Bookmarks
          </h1>
        </div>
        
        {loading ? (
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <IonSpinner color="primary" />
          </div>
        ) : Object.keys(bookmarks).length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--ion-color-medium)' }}>
            <p>You haven't bookmarked any articles yet.</p>
          </div>
        ) : (
          <div style={{ padding: '0 0 100px 0' }}>
            <IonList style={{ background: 'transparent' }}>
              {Object.values(bookmarks).map((cachedArticle) => {
                if (!cachedArticle.id) return null;
                
                const full = fullArticles[cachedArticle.id];
                const article = full || cachedArticle; // fallback to cached

                return (
                  <IonItem 
                    key={article.id} 
                    lines="none"
                    style={{ 
                      '--background': '#11231a', 
                      '--border-color': 'transparent',
                      marginBottom: '12px', 
                      borderRadius: '16px', 
                      margin: '0 16px 12px 16px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                  >
                    <IonLabel className="ion-text-wrap" style={{ padding: '16px 0' }}>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        <CategoryBadge category={article.category || ''} />
                        {article.sentimentLabel && <SentimentBadge sentimentLabel={article.sentimentLabel} />}
                      </div>
                      <h2 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                        {article.headline}
                      </h2>
                      {full ? (
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                          {full.keyTakeaways?.[0]}
                        </p>
                      ) : (
                        <p style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                          Viewing cached version (offline)
                        </p>
                      )}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;

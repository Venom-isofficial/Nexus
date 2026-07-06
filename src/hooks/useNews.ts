import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, getDocs, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface NewsArticle {
  id: string;
  headline: string;
  keyTakeaways: string[];
  category: string;
  sentiment: string;
  sentimentLabel: string;
  materiality: string;
  corroborationCount: number;
  publishedAt: number;
  sources: string[];
  stock: string;
  readThrough?: { ticker: string; correlation: number; relationship: string }[];
}

export const useNews = (categoryFilter: string) => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);

  useEffect(() => {
    setLoading(true);
    let q = query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(15));
    
    // If a category filter is applied, we fetch more and filter client-side
    // to avoid requiring a composite index immediately. 
    if (categoryFilter.toLowerCase() !== 'all') {
      q = query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(50));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
      
      if (categoryFilter.toLowerCase() !== 'all') {
        fetchedNews = fetchedNews.filter(n => n.category?.toLowerCase() === categoryFilter.toLowerCase());
      }
      
      setNews(fetchedNews);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    });

    return unsubscribe;
  }, [categoryFilter]);

  const loadMore = async () => {
    if (!lastVisible) return;
    
    let q = query(
      collection(db, 'news'),
      orderBy('publishedAt', 'desc'),
      startAfter(lastVisible),
      limit(10)
    );

    if (categoryFilter.toLowerCase() !== 'all') {
      q = query(
        collection(db, 'news'),
        orderBy('publishedAt', 'desc'),
        startAfter(lastVisible),
        limit(30)
      );
    }

    const snapshot = await getDocs(q);
    let moreNews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
    
    if (categoryFilter.toLowerCase() !== 'all') {
      moreNews = moreNews.filter(n => n.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (moreNews.length > 0) {
      setNews(prev => [...prev, ...moreNews]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  };

  return { news, loading, loadMore };
};

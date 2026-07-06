import { useState, useEffect, useCallback } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { NewsArticle } from './useNews';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Record<string, Partial<NewsArticle>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookmarks({});
      setLoading(false);
      return;
    }

    const bookmarksRef = collection(db, 'users', user.uid, 'bookmarks');
    const unsubscribe = onSnapshot(bookmarksRef, (snapshot) => {
      const bmarks: Record<string, Partial<NewsArticle>> = {};
      snapshot.forEach(doc => {
        bmarks[doc.id] = doc.data() as Partial<NewsArticle>;
      });
      setBookmarks(bmarks);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const toggleBookmark = useCallback(async (article: NewsArticle) => {
    if (!user) return;
    
    const isBookmarked = !!bookmarks[article.id];
    const docRef = doc(db, 'users', user.uid, 'bookmarks', article.id);

    if (isBookmarked) {
      await deleteDoc(docRef);
    } else {
      // Save lightweight copy for offline capability
      await setDoc(docRef, {
        id: article.id,
        headline: article.headline,
        category: article.category,
        sentiment: article.sentiment,
        sentimentLabel: article.sentimentLabel,
        publishedAt: article.publishedAt,
        sources: article.sources || [],
      });
    }
  }, [user, bookmarks]);

  const isBookmarked = useCallback((articleId: string) => {
    return !!bookmarks[articleId];
  }, [bookmarks]);

  return { bookmarks, loading, toggleBookmark, isBookmarked };
};

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string | null;
  photoURL: string | null;
  gender?: string;
  dob?: string;
  currency?: string;
  monthlyIncome?: string;
  onboardingComplete: boolean;
  theme: 'dark' | 'light';
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  updateProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // First time user, profile doesn't exist yet
          const nameParts = currentUser.displayName ? currentUser.displayName.split(' ') : [];
          setProfile({
            uid: currentUser.uid,
            firstName: nameParts[0] || '',
            lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : '',
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            onboardingComplete: false,
            theme: 'dark',
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !profile) return;
    const updated = { ...profile, ...data };
    await setDoc(doc(db, 'users', user.uid), updated, { merge: true });
    setProfile(updated);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

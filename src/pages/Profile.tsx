import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonToggle, useIonToast, IonSpinner } from '@ionic/react';
import { logOutOutline, trashOutline, refreshOutline, bookmarkOutline, barChartOutline, personCircleOutline } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useBookmarks } from '../hooks/useBookmarks';

const Profile: React.FC = () => {
  const { profile, logout, updateProfile, loading } = useAuth();
  const { bookmarks } = useBookmarks();
  const [present] = useIonToast();
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'midnight' | 'light'>(profile?.theme || 'dark');

  useEffect(() => {
    const theme = profile?.theme || 'dark';
    setCurrentTheme(theme);
    
    document.body.classList.remove('light-theme', 'midnight-theme');
    
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else if (theme === 'midnight') {
      document.body.classList.add('midnight-theme');
    }
  }, [profile?.theme]);

  const setTheme = async (theme: 'dark' | 'midnight' | 'light') => {
    setCurrentTheme(theme);
    
    document.body.classList.remove('light-theme', 'midnight-theme');
    
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else if (theme === 'midnight') {
      document.body.classList.add('midnight-theme');
    }

    try {
      await updateProfile({ theme });
    } catch (e) {
      console.error("Failed to save theme preference");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      present({ message: 'Error logging out', duration: 2000, color: 'danger' });
    }
  };

  const showNotImplemented = (msg: string) => {
    present({ message: msg + ' is coming soon!', duration: 2000, color: 'warning' });
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
           <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <IonSpinner color="primary" />
           </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        
        {/* Header Section */}
        <div style={{ padding: '60px 16px 20px 16px', zIndex: 11, position: 'relative' }}>
          <div style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            Preferences & Vault
          </div>
          <h1 style={{ margin: '4px 0 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>
            Security & Settings
          </h1>
        </div>

        <div style={{ padding: '0 16px 100px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* User Info Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(20,40,25,1) 0%, rgba(20,40,25,0.4) 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(165,237,114,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(165,237,114,0.1)',
              border: '1px solid var(--ion-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ion-color-primary)', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              {profile?.photoURL ? (
                <img src={profile.photoURL} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                profile?.firstName?.charAt(0) || <IonIcon icon={personCircleOutline} />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>
                  {profile?.firstName} {profile?.lastName}
                </h2>
                <span style={{ backgroundColor: 'rgba(165,237,114,0.2)', color: 'var(--ion-color-primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                  PREMIUM
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                {profile?.email}
              </p>
              <p style={{ margin: '2px 0 0 0', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
                Country: United States
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, backgroundColor: '#11231a', borderRadius: '20px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(165,237,114,0.1)', padding: '8px', borderRadius: '12px', display: 'flex', color: 'var(--ion-color-primary)' }}>
                <IonIcon icon={barChartOutline} style={{ fontSize: '20px' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Watchlist</div>
                <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>4 Assets</div>
              </div>
            </div>
            
            <div style={{ flex: 1, backgroundColor: '#11231a', borderRadius: '20px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ backgroundColor: 'rgba(165,237,114,0.1)', padding: '8px', borderRadius: '12px', display: 'flex', color: 'var(--ion-color-primary)' }}>
                <IonIcon icon={bookmarkOutline} style={{ fontSize: '20px' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Bookmarks</div>
                <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 'bold' }}>{Object.keys(bookmarks).length} Stories</div>
              </div>
            </div>
          </div>

          {/* Visual Themes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <IonIcon icon={personCircleOutline} style={{ fontSize: '16px', color: 'var(--ion-color-primary)' }} />
              Custom Visual Themes
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div 
                onClick={() => setTheme('dark')}
                style={{ flex: 1, backgroundColor: '#11231a', borderRadius: '16px', padding: '16px 0', border: currentTheme === 'dark' ? '1px solid var(--ion-color-primary)' : '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0b1a12', border: currentTheme === 'dark' ? '4px solid #1a3627' : '1px solid rgba(255,255,255,0.2)' }}></div>
                <span style={{ fontSize: '0.8rem', color: currentTheme === 'dark' ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Dark Green</span>
              </div>
              <div 
                onClick={() => setTheme('midnight')}
                style={{ flex: 1, backgroundColor: '#11231a', borderRadius: '16px', padding: '16px 0', border: currentTheme === 'midnight' ? '1px solid var(--ion-color-primary)' : '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#000', border: currentTheme === 'midnight' ? '4px solid #1a1a1a' : '1px solid rgba(255,255,255,0.2)' }}></div>
                <span style={{ fontSize: '0.8rem', color: currentTheme === 'midnight' ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Midnight</span>
              </div>
              <div 
                onClick={() => setTheme('light')}
                style={{ flex: 1, backgroundColor: '#11231a', borderRadius: '16px', padding: '16px 0', border: currentTheme === 'light' ? '1px solid var(--ion-color-primary)' : '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#f4f5f8', border: currentTheme === 'light' ? '4px solid #d7d8da' : '1px solid rgba(255,255,255,0.2)' }}></div>
                <span style={{ fontSize: '0.8rem', color: currentTheme === 'light' ? '#000' : 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Light Mode</span>
              </div>
            </div>
          </div>

          {/* Alert Configs */}
          <div style={{ backgroundColor: '#11231a', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <IonIcon icon={bookmarkOutline} style={{ fontSize: '16px', color: 'var(--ion-color-primary)' }} />
              Alert Configurations
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>Push Alert Triggers</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Instant alerts when targets break</div>
              </div>
              <IonToggle checked={true} style={{ '--background-checked': 'var(--ion-color-primary)' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#fff' }}>Daily Summary Briefings</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Receive morning market reviews</div>
              </div>
              <IonToggle checked={false} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div onClick={() => showNotImplemented('Purge')} style={{ backgroundColor: '#11231a', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <IonIcon icon={refreshOutline} style={{ color: 'var(--ion-color-primary)' }} />
              PURGE CACHED QUOTES
            </div>
            
            <div onClick={handleLogout} style={{ backgroundColor: '#11231a', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              <IonIcon icon={logOutOutline} style={{ color: 'rgba(255,255,255,0.5)' }} />
              TERMINATE SECURE SESSION
            </div>

            <div onClick={() => showNotImplemented('Delete Creds')} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#EF4444', fontWeight: 'bold', border: '1px solid rgba(239, 68, 68, 0.3)', cursor: 'pointer' }}>
              <IonIcon icon={trashOutline} />
              DELETE FINNHUB CREDENTIALS
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;

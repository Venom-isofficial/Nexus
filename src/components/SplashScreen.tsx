import React from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';

const SplashScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent style={{ '--background': 'var(--ion-background-color)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(165, 237, 114, 0.1)',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(165, 237, 114, 0.2)',
            marginBottom: '16px'
          }}>
            <IonIcon icon={eyeOutline} style={{ fontSize: '32px', color: 'var(--ion-color-primary)' }} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>Nexus</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '8px' }}>
            Understand Markets. Not Just Prices.
          </p>
          <div style={{ marginTop: '48px', width: '120px', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: 'var(--ion-color-primary)', borderRadius: '2px', animation: 'indeterminate 1s infinite linear' }}></div>
          </div>
        </div>
        <style>{`
          @keyframes indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;

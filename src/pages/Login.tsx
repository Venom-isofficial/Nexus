import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonIcon, useIonToast, IonInput } from '@ionic/react';
import { logoGoogle, mailOutline, lockClosedOutline, eyeOutline } from 'ionicons/icons';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const [present] = useIonToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  if (user) {
    return <Redirect to="/app/home" />;
  }

  const handleGoogleLogin = async () => {
    try {
      await FirebaseAuthentication.signInWithGoogle();
    } catch (error: any) {
      present({
        message: 'Google Sign In failed: ' + error.message,
        duration: 3000,
        color: 'danger'
      });
    }
  };

  const showNotImplemented = (method: string) => {
    present({
      message: `${method} is coming soon!`,
      duration: 3000,
      color: 'warning'
    });
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', alignItems: 'center', padding: '40px 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'rgba(165, 237, 114, 0.1)',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(165, 237, 114, 0.2)',
              margin: '0 auto 16px auto'
            }}>
              <IonIcon icon={eyeOutline} style={{ fontSize: '28px', color: 'var(--ion-color-primary)' }} />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>Nexus</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '8px' }}>
              The signal in the noise.
            </p>
          </div>

          <div style={{ 
            width: '100%', 
            maxWidth: '400px', 
            backgroundColor: '#11231a', 
            borderRadius: '16px', 
            padding: '32px 24px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>Sign In</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 24px 0' }}>
              Enter your registered email to explore deep market insights.
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '0 16px',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <IonIcon icon={mailOutline} style={{ color: 'rgba(255,255,255,0.5)', marginRight: '12px' }} />
              <IonInput 
                value={email}
                onIonInput={e => setEmail(e.detail.value!)}
                placeholder="Email Address"
                type="email"
                style={{ '--color': '#fff', '--placeholder-color': 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '0 16px',
              marginBottom: '8px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <IonIcon icon={lockClosedOutline} style={{ color: 'rgba(255,255,255,0.5)', marginRight: '12px' }} />
              <IonInput 
                value={password}
                onIonInput={e => setPassword(e.detail.value!)}
                placeholder="Password"
                type="password"
                style={{ '--color': '#fff', '--placeholder-color': 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <span onClick={() => showNotImplemented('Forgot Password')} style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                Forgot Password?
              </span>
            </div>

            <IonButton 
              expand="block" 
              onClick={() => showNotImplemented('Email Sign In')}
              style={{ '--background': 'var(--ion-color-primary)', '--color': '#0b1a12', fontWeight: 'bold', '--border-radius': '8px', marginBottom: '32px' }}
            >
              CONTINUE <IonIcon slot="end" icon={eyeOutline} style={{ opacity: 0 }} /> 
              {/* Dummy icon for spacing if needed, or just text */}
            </IonButton>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ margin: '0 16px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}>OR SIGN IN WITH</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <IonButton 
              expand="block" 
              fill="outline"
              onClick={handleGoogleLogin}
              style={{ '--border-color': 'rgba(255,255,255,0.1)', '--color': '#fff', '--border-radius': '8px', marginBottom: '16px' }}
            >
              <IonIcon slot="start" icon={logoGoogle} />
              Google
            </IonButton>

            <IonButton 
              expand="block" 
              fill="outline"
              onClick={() => showNotImplemented('Guest Access')}
              style={{ '--background': 'rgba(255,255,255,0.05)', '--border-color': 'transparent', '--color': '#fff', '--border-radius': '8px', marginBottom: '32px' }}
            >
              ACCESS AS GUEST
            </IonButton>

            <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
              Don't have an account? <span onClick={() => showNotImplemented('Sign Up')} style={{ color: 'var(--ion-color-primary)', fontWeight: 'bold', cursor: 'pointer' }}>Create Account</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', gap: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Enforce SSL</span>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;

import React, { useRef, useState } from 'react';
import { IonPage, IonContent, IonButton, IonInput, IonSelect, IonSelectOption, IonIcon, useIonToast } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { arrowForward, checkmarkOutline, personCircle } from 'ionicons/icons';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

import 'swiper/css';
import 'swiper/css/pagination';

const Onboarding: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const history = useHistory();
  const swiperRef = useRef<any>(null);
  const [present] = useIonToast();

  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    currency: profile?.currency || 'USD',
    monthlyIncome: profile?.monthlyIncome || '',
  });

  const handleNext = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handleComplete = async () => {
    if (!formData.firstName) {
      present({ message: 'First name is required', duration: 2000, color: 'danger' });
      return;
    }

    try {
      await updateProfile({
        ...formData,
        onboardingComplete: true,
      });
      history.push('/app/home');
    } catch (e: any) {
      console.error("Profile Save Error: ", e);
      present({ message: `Error saving profile: ${e.message}`, duration: 3000, color: 'danger' });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': 'var(--ion-background-color)' }}>
        <Swiper
          ref={swiperRef}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          style={{ height: '100%' }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--ion-color-primary)', marginBottom: '16px' }}>Nexus</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--ion-color-medium)', marginBottom: '48px' }}>
                Your market pulse, distilled.
              </p>
              <IonButton shape="round" style={{ '--background': 'var(--ion-color-primary)', '--color': '#0b1a12', fontWeight: 'bold' }} onClick={handleNext}>
                Continue <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📱</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px' }}>Swipe for Signals</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--ion-color-medium)', marginBottom: '48px' }}>
                Skip the noise. Get institutional-grade market insights formatted as bite-sized reels.
              </p>
              <IonButton shape="round" style={{ '--background': 'var(--ion-color-primary)', '--color': '#0b1a12', fontWeight: 'bold' }} onClick={handleNext}>
                Next <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', padding: '24px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Set up your profile</h2>
              <p style={{ color: 'var(--ion-color-medium)', textAlign: 'center', marginBottom: '32px' }}>Let's personalize your experience</p>

              <GlassCard>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                  ) : (
                    <IonIcon icon={personCircle} style={{ fontSize: '80px', color: 'var(--ion-color-medium)' }} />
                  )}
                </div>

                <IonInput 
                  label="First Name" 
                  labelPlacement="floating" 
                  value={formData.firstName}
                  onIonInput={e => setFormData({ ...formData, firstName: e.detail.value! })}
                  style={{ marginBottom: '16px', '--background': 'rgba(0,0,0,0.2)', borderRadius: '8px' }}
                />
                
                <IonInput 
                  label="Last Name (Optional)" 
                  labelPlacement="floating" 
                  value={formData.lastName}
                  onIonInput={e => setFormData({ ...formData, lastName: e.detail.value! })}
                  style={{ marginBottom: '16px', '--background': 'rgba(0,0,0,0.2)', borderRadius: '8px' }}
                />

                <IonSelect 
                  label="Preferred Currency" 
                  labelPlacement="floating"
                  value={formData.currency}
                  onIonChange={e => setFormData({ ...formData, currency: e.detail.value })}
                  style={{ marginBottom: '16px', '--background': 'rgba(0,0,0,0.2)', borderRadius: '8px' }}
                >
                  <IonSelectOption value="USD">USD ($)</IonSelectOption>
                  <IonSelectOption value="INR">INR (₹)</IonSelectOption>
                  <IonSelectOption value="EUR">EUR (€)</IonSelectOption>
                  <IonSelectOption value="GBP">GBP (£)</IonSelectOption>
                </IonSelect>

                <IonSelect 
                  label="Monthly Income Range" 
                  labelPlacement="floating"
                  value={formData.monthlyIncome}
                  onIonChange={e => setFormData({ ...formData, monthlyIncome: e.detail.value })}
                  style={{ marginBottom: '24px', '--background': 'rgba(0,0,0,0.2)', borderRadius: '8px' }}
                >
                  <IonSelectOption value="below_2k">Below $2,000</IonSelectOption>
                  <IonSelectOption value="2k_to_5k">$2,000 - $5,000</IonSelectOption>
                  <IonSelectOption value="5k_to_10k">$5,000 - $10,000</IonSelectOption>
                  <IonSelectOption value="above_10k">Above $10,000</IonSelectOption>
                </IonSelect>

                <IonButton expand="block" shape="round" style={{ '--background': 'var(--ion-color-primary)', '--color': '#0b1a12', fontWeight: 'bold', marginTop: '16px' }} onClick={handleComplete}>
                  Get Started <IonIcon slot="end" icon={checkmarkOutline} />
                </IonButton>
              </GlassCard>
            </div>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;

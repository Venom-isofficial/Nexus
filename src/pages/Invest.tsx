import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Invest: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Invest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Invest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>Investment portfolio coming soon...</p>
      </IonContent>
    </IonPage>
  );
};

export default Invest;

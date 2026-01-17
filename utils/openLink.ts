import { Linking, Alert } from 'react-native';

export const openLink = async (url: string) => {
    try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
            await Linking.openURL(url);
        } else {
            console.warn('Cannot open URL:', url);
            // Optional: User feedback
            // Alert.alert('Errore', 'Impossibile aprire il link. Verifica la tua connessione o il browser.');
        }
    } catch (error) {
        console.error('Error opening URL:', error);
        // Prevent crash
    }
};

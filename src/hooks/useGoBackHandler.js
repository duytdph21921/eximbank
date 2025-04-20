import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useGoBackHandler(onGoBackCallback, deps) {
  const navigation = useNavigation();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onGoBackCallback);
    navigation.addListener('gestureEnd', onGoBackCallback);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onGoBackCallback);
      navigation.removeListener('gestureEnd', onGoBackCallback);
    };
  }, [navigation, onGoBackCallback, deps]);
}

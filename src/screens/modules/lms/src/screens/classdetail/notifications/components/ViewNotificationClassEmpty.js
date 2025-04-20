import React from 'react';
import { StyleSheet, View } from 'react-native';
import CMText from '@components/CMText';
import IconEmpty from '@assets/icons/icon_no_notification.svg';
import { vertical } from '@utils/scales';

const ViewNotificationClassEmpty = () => (
  <View style={styles.container}>
    <IconEmpty width={188} height={140} />
    <CMText i18nKey="text-empty-notification" style={styles.textEmpty} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  textEmpty: {
    marginTop: vertical(20),
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 35,
  },
});
export default ViewNotificationClassEmpty;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import { Color } from '@theme/colors';
import { horizontal, vertical } from '@utils/scales';

const ProfileScreenPlaceholder = () => {
  const renderFade = (props) => (
    <Fade {...props} style={styles.animationPlaceholder} />
  );

  return (
    <View style={styles.container}>
      <Placeholder Animation={renderFade}>
        <View style={styles.viewInfor}>
          <PlaceholderLine style={styles.imageProfile} />
          <PlaceholderLine style={styles.linePlaceholder} width={50} />
          <PlaceholderLine style={styles.linePlaceholder} width={50} />
        </View>
      </Placeholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  viewInfor: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(30),
  },
  imagePlaceholder: {
    backgroundColor: Color.gray,
    width: horizontal(100),
    height: horizontal(100),
    borderRadius: 50,
  },
  animationPlaceholder: {
    backgroundColor: '#d1d1cd',
  },
  linePlaceholder: {
    backgroundColor: Color.gray,
  },
  imageProfile: {
    backgroundColor: Color.gray,
    width: horizontal(100),
    height: horizontal(100),
    borderRadius: horizontal(50),
  },
});

export default ProfileScreenPlaceholder;

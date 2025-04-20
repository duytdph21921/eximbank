import React from 'react';
import TouchableDebounce from '@components/TouchableDebounce';
import CMText from '@components/CMText';
import { StyleSheet, View } from 'react-native';
import { Color } from '@theme/colors';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';

const ItemPost = (props) => {
  const { item } = props;
  return (
    <TouchableDebounce style={styles.viewItem}>
      <View style={styles.item}>
        <CMText title="1" style={styles.title} />
      </View>
    </TouchableDebounce>
  );
};

const styles = StyleSheet.create({
  viewItem: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: Color.transparents,
    marginVertical: vertical(10),
    marginHorizontal: vertical(10),
    borderColor: Color.cl_border_input,
  },
  item: {
    height: vertical(50),
    backgroundColor: Color.white,
    borderColor: Color.cl_border_input,
    lignItems: 'center',
    width: screenWidth - horizontal(10 * 2),
  },
  title: {
    color: Color.base_color,
  },
});

export default ItemPost;

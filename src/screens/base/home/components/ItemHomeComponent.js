import React from 'react';
import { StyleSheet, View } from 'react-native';

const ItemHomeComponent = (props) => {
  const { listListNewClass, listOutstanding, listSuggestions, navigation } = props;

  return <View style={style.container} />;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ItemHomeComponent;

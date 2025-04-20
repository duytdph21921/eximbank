/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { SceneMap, TabView } from 'react-native-tab-view';
import { horizontal, textSize, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import { Color } from '@theme/colors';
import CMText from '../CMText';
import TouchableDebounce from '../TouchableDebounce';

const CustomTabView = ({
  firstRoute,
  secondRoute,
  onIndexChange,
  routes,
  style,
  styleContainer,
  activeTab,
  colorButtonTabActive = [Color.text_color, Color.text_color, Color.text_color],
  colorButtonTabUnActive = [
    Color.color_bg_tab_view,
    Color.color_bg_tab_view,
    Color.color_bg_tab_view,
  ],
}) => {
  const [index, setIndex] = useState(activeTab || 0);

  const renderScene = SceneMap({
    first: firstRoute,
    second: secondRoute,
  });

  const renderTabBar = ({ navigationState }) => (
    <View style={{ ...styles.tabBar, ...style }}>
      {navigationState.routes.map((route, i) => (
        <TouchableDebounce
          key={`${i + 1}`}
          style={styles.tabItem}
          onPress={() => handleIndexChange(i)}
        >
          {i === 0 ? (
            <Animated.View style={[styles.activeView]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={index === i ? colorButtonTabActive : colorButtonTabUnActive}
                style={styles.gradient}
              />
            </Animated.View>
          ) : (
            <Animated.View style={[styles.activeView]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={index === i ? colorButtonTabActive : colorButtonTabUnActive}
                style={styles.gradient}
              />
            </Animated.View>
          )}
          <CMText
            style={[
              styles.textTitleTab,
              {
                color: index === i ? Color.white : Color.text_color,
              },
            ]}
            i18nKey={route.title}
          />
        </TouchableDebounce>
      ))}
    </View>
  );

  const handleIndexChange = useCallback((index) => {
    setIndex(index);
    onIndexChange(index);
  }, []);

  return (
    <TabView
      style={[styles.tabView, { ...styleContainer }]}
      pressColor={Color.transparent}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: horizontal(18),
    marginBottom: vertical(15),
    borderRadius: horizontal(30),
    backgroundColor: Color.white,
    marginHorizontal: horizontal(15),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    borderRadius: horizontal(25),
  },
  activeView: {
    position: 'absolute',
    top: -horizontal(12),
    left: horizontal(8),
    right: horizontal(8),
    bottom: -horizontal(11),
  },
  textTitleTab: {
    fontSize: textSize(12),
    fontFamily: fonts.regular,
    fontWeight: '600',
    lineHeight: textSize(20.4),
  },
});

export default CustomTabView;

/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { hasNotch } from 'react-native-device-info';
import Constant from '@utils/constants';
import { isIOS, isTablet } from '@utils/platforms';
import IconStudy from '@assets/icons/icon_study_bottom.svg';
import ExtendActiveIcon from '@assets/other/icon_extend_active';
import ExtendInActiveIcon from '@assets/other/icon_extend_unactive.svg';
import HomeActiveIcon from '@assets/other/icon_home_active';
import HomeInActiveIcon from '@assets/other/icon_home_unactive.svg';
import TestActiveIcon from '@assets/other/icon_learning_active';
import TestInActiveIcon from '@assets/other/icon_learning_unactive.svg';
import SearchActiveIcon from '@assets/other/icon_search_active';
import SearchIvActiveIcon from '@assets/other/icon_search_unactive.svg';
import CMText from '@components/CMText';
import globalStyles from '@theme/globalStyles';
import { Color } from '@theme/colors';

import { LmsStack } from 'module-lms';
import { TestStack } from 'module-test';
import { HomeStack } from './HomeStack';
import { SearchStack } from './SearchStack';
// import {LearningStack} from './LearningStack';
// import {TestStack} from './TestStack';
import { ExtendStack } from './ExtendStack';

const WIDTH_ICON = isTablet ? 85 : 65;
const HEIGHT_ICON = isTablet ? 105 : 85;

const BottomTab = createBottomTabNavigator();

export const TabNavigation = (props) => {
  const { navigation } = props;
  const [showTab, setShowTab] = useState(true);
  const sizeIcon = isTablet ? 36 : 24;
  useEffect(() => {
    if (isIOS) return;
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      // Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      // Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setShowTab(false);
  };

  const keyboardDidHide = () => {
    setShowTab(true);
  };

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Color.base_color,
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 14,
          marginBottom: hasNotch() && isIOS ? 15 : 10,
        },
        tabBarItemStyle: {
          backgroundColor: 'white',
          height: hasNotch() && isIOS ? 75 : 60,
        },
        tabBarStyle: showTab ? styles.tabbar : [styles.tabbar, { bottom: -75 }],
      }}
    >
      <BottomTab.Screen
        name={Constant.HOMESTACK}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={globalStyles.containIconTab}>
                <HomeActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText
                  i18nKey="text-tabar-label-home"
                  style={[
                    styles.textTabBarLabelActive,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <HomeInActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText i18nKey="text-tabar-label-home" style={styles.textTabBarLabel} />
              </View>
            ),
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
      <BottomTab.Screen
        name={Constant.SEARCH_STACK}
        component={SearchStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={globalStyles.containIconTab}>
                <SearchActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText
                  i18nKey="text-tabar-label-search"
                  style={[
                    styles.textTabBarLabelActive,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <SearchIvActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText i18nKey="text-tabar-label-search" style={styles.textTabBarLabel} />
              </View>
            ),
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {
            navigation.navigate(Constant.SEARCH_STACK, {
              screen: Constant.SEARCH_SCREEN,
              params: {
                orderBy: 1,
              },
            });
          },
        })}
      />
      <BottomTab.Screen
        name={Constant.LEARNING_STACK}
        component={LmsStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={styles.containSpot}>
              <View
                style={[
                  styles.viewLearning,
                  {
                    backgroundColor: Color.base_color,
                  },
                ]}
              >
                <IconStudy width={sizeIcon} height={sizeIcon} />
              </View>
              {focused ? (
                <CMText
                  i18nKey="text-tabar-label-learning"
                  style={[
                    styles.textLabelLearningActive,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              ) : (
                <CMText i18nKey="text-tabar-label-learning" style={styles.textLabelLearning} />
              )}
            </View>
          ),
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
      <BottomTab.Screen
        name={Constant.TEST_STACK}
        component={TestStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={globalStyles.containIconTab}>
                <TestActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText
                  i18nKey="text-tabar-label-test"
                  style={[
                    styles.textTabBarLabelActive,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <TestInActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText i18nKey="text-tabar-label-test" style={styles.textTabBarLabel} />
              </View>
            ),
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
      <BottomTab.Screen
        name={Constant.EXTEND_STACK}
        component={ExtendStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <View style={globalStyles.containIconTab}>
                <ExtendActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText
                  i18nKey="text-tabar-label-extend"
                  style={[
                    styles.textTabBarLabelActive,
                    {
                      color: Color.base_color,
                    },
                  ]}
                />
              </View>
            ) : (
              <View style={globalStyles.containIconTab}>
                <ExtendInActiveIcon width={sizeIcon} height={sizeIcon} />
                <CMText i18nKey="text-tabar-label-extend" style={styles.textTabBarLabel} />
              </View>
            ),
        }}
        listeners={({ navigator, router }) => ({
          tabPress: (e) => {},
        })}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: 'white',
    height: hasNotch() && isIOS ? 75 : isTablet ? 120 : 60,
    ...Platform.select({
      ios: {
        shadowColor: Color.white,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        backgroundColor: Color.white,
      },
      android: {
        elevation: 1,
        backgroundColor: Color.white,
      },
    }),
    zIndex: 1,
  },
  containSpot: {
    position: 'absolute',
    bottom: hasNotch() && isIOS ? -10 : -20,
    width: WIDTH_ICON,
    height: HEIGHT_ICON,
    alignItems: 'center',
  },
  viewLearning: {
    width: WIDTH_ICON,
    height: WIDTH_ICON,
    borderRadius: WIDTH_ICON / 2,
    backgroundColor: Color.base_color,
    borderWidth: 5,
    borderColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTabBarLabelActive: {
    fontWeight: '700',
    fontSize: isTablet ? 18 : 10,
    lineHeight: isTablet ? 23 : 16,
    color: Color.base_color,
  },
  textTabBarLabel: {
    fontWeight: '600',
    fontSize: isTablet ? 18 : 10,
    lineHeight: isTablet ? 23 : 16,
    color: Color.text_color_hover,
  },
  textLabelLearningActive: {
    fontWeight: '700',
    fontSize: isTablet ? 18 : 10,
    lineHeight: isTablet ? 23 : 16,
    color: Color.base_color,
    justifyContent: 'space-between',
  },
  textLabelLearning: {
    fontWeight: '600',
    fontSize: isTablet ? 18 : 10,
    lineHeight: isTablet ? 23 : 16,
    color: Color.text_color_hover,
    justifyContent: 'space-between',
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  View,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { styles } from './Study.styles';
import ClassRoomScreen from './classroom/ClassRoomScreen';
import EducationProgramScreen from './educationprogram/EducationProgramScreen';

// StudyScreen.propTypes = {};

// StudyScreen.defaultProps = {};

const StudyScreen = (props) => {
  const { navigation, route } = props;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'text-tab-class-room' },
    { key: 'second', title: 'text-tab-edu-programer' },
    // { key: "three", title: "text-tab-live-class" },
    // { key: "four", title: "text-tab-class-downloaded" },
    // { key: "five", title: "text-tab-document" },
  ]);
  const [headerWidths, setWidths] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  const renderHeaderRight = () => <View />;

  const renderHeaderLeft = () => (
    <CMText i18nKey="text-tab-study-screen" style={styles.textTitleScreen} />
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: '',
    });
  }, []);

  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };

  useEffect(() => {
    let leftOffset = 0;
    for (let i = 0; i < index; i += 1) {
      leftOffset += headerWidths[i];
    }
    scrollViewRef.current.scrollToIndex({
      index,
      viewPosition: 0.5,
    });
    Animated.spring(barTranslate1, {
      toValue: leftOffset,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [index]);

  const layout = useWindowDimensions();
  const ClassRoute = useCallback(
    () => (
      <ClassRoomScreen navigation={navigation} index={index} route={route} />
    ),
    [index || route?.params?.dataBack]
  );

  const EduTrandingRoute = useCallback(
    () => (
      <EducationProgramScreen
        navigation={navigation}
        index={index}
        route={route}
      />
    ),
    [index]
  );

  // const FirstRoute = () => (
  //   <View
  //     style={{
  //       marginHorizontal: horizontal(24),
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       flex: 1,
  //     }}
  //   >
  //     <CMText i18nKey="text-comming-soon" />
  //   </View>
  // );

  const renderScene = SceneMap({
    first: ClassRoute,
    second: EduTrandingRoute,
    // three: FirstRoute,
    // four: FirstRoute,
    // five: FirstRoute,
  });

  const renderTabBar = () => (
    <View style={styles.btnContainer}>
      <FlatList
        bounces={false}
        data={routes}
        ref={scrollViewRef}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={(itemTab) => (
          <View style={styles.viewItemHeader}>
            <TouchableDebounce
              onLayout={(e) => {
                onHeaderLayout(e.nativeEvent.layout.width, itemTab.index);
              }}
              onPress={() => {
                setIndex(itemTab.index);
              }}
              style={[
                styles.btnActive,
                {
                  borderBottomColor:
                    index === itemTab.index
                      ? Color.base_color
                      : Color.color_bg_tab_view,
                },
              ]}
            >
              <CMText
                style={[
                  styles.btnTextActive,
                  {
                    color:
                      index === itemTab.index
                        ? Color.base_color
                        : Color.text_color,
                    fontWeight: index === itemTab.index ? '700' : '400',
                  },
                ]}
                i18nKey={itemTab.item.title}
              />
            </TouchableDebounce>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </SafeAreaView>
  );
};
export default StudyScreen;

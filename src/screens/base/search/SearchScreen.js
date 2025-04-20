/* eslint-disable no-promise-executor-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Animated, FlatList, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import CMText from '@components/CMText';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { styles } from './Search.style';
import ClassScreen from './class/ClassScreen';
import DocumentSearchScreen from './document/DocumentSearchScreen';
import ExamSearchScreen from './exam/ExamSearchScreen';
import TrainingScreen from './training/TrainingScreen';

const SearchScreen = (props) => {
  const { navigation, route } = props;
  const { tabIndex } = route?.params ?? 0;
  const [index, setIndex] = useState(0);
  const [headerWidths, setWidths] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const barTranslate1 = useRef(new Animated.Value(0)).current;
  const isMounteRef = useRef(false);

  const [routes] = useState([
    { key: 'class', title: 'text-tab-class-room' },
    { key: 'training', title: 'text-tab-edu-programer' },
    { key: 'exam', title: 'text-tabar-label-test' },
    { key: 'document', title: 'text-tab-document' },
  ]);

  const renderHeaderLeft = () => (
    <CMText i18nKey="text-tabar-label-search" style={styles.textTitleScreen} />
  );

  const renderHeaderRight = () => <View />;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: renderHeaderLeft,
      headerRight: renderHeaderRight,
      title: '',
    });
  }, [navigation]);

  const onHeaderLayout = (width, index) => {
    const newWidths = [...headerWidths];
    newWidths[index] = width;
    setWidths(newWidths);
  };

  useEffect(() => {
    isMounteRef.current = true;
    if (isMounteRef.current) {
      setIndex(tabIndex ?? 0);
    }
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
    return () => {
      isMounteRef.current = false;
    };
  }, []);

  const layout = useWindowDimensions();

  const ClassRoute = useCallback(
    () => <ClassScreen navigation={navigation} index={index} route={route} />,
    [index || route?.params?.dataBack],
  );
  const TrainingRoute = useCallback(
    () => <TrainingScreen navigation={navigation} index={index} />,
    [index || route?.params?.dataBack],
  );
  const ExamRoute = useCallback(
    () => <ExamSearchScreen navigation={navigation} index={index} />,
    [index || route?.params?.dataBack],
  );
  const DocumentRoute = useCallback(
    () => <DocumentSearchScreen navigation={navigation} index={index} route={route} />,
    [index || route?.params?.dataBack],
  );
  const renderScene = SceneMap({
    class: ClassRoute,
    training: TrainingRoute,
    exam: ExamRoute,
    document: DocumentRoute,
  });
  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      scrollViewRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };
  const getItemLayout = (data, index) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset += headerWidths[i] || 0;
    }
    const length = headerWidths[index] || 0;
    return { length, offset, index };
  };
  const renderTabBar = (prop) => (
    <View style={styles.btnContainer}>
      <FlatList
        bounces={false}
        data={routes}
        ref={scrollViewRef}
        keyExtractor={(_item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        renderItem={(itemTab) => (
          <View>
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
                    index === itemTab.index ? Color.base_color : Color.color_bg_tab_view,
                },
              ]}
            >
              <CMText
                style={[
                  styles.textActive,
                  {
                    color: index === itemTab.index ? Color.base_color : Color.text_color,
                    fontWeight: index === itemTab.index ? '700' : '400',
                  },
                ]}
                i18nKey={itemTab.item.title}
              />
            </TouchableDebounce>
          </View>
        )}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={handleScrollToIndexFailed}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => {
          setIndex(index);
        }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </View>
  );
};

export default SearchScreen;

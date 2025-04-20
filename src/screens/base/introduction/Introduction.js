/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import CMText from '@components/CMText';
import { useSelector } from 'react-redux';
import { Color } from '@theme/colors';
import { storage } from '@utils/storage';
import { styles } from './Introduction.styles';
import Header from './Header';
import Indicator from './Indicartor';
import ButtonFooter from './ButtonFooter';

const SNAP_INTERVAL = screenWidth;
const imgHeader = require('@assets/img/img_logo.png');

const items = [
  {
    titleVN: 'Trải nghiệm học tập trực tuyến',
    titleEN: 'Experience online learning',
    descVN: 'Tiếp cận học trực tuyến với phương pháp học mới mẻ, hiệu quả',
    descEN: 'Approach online learning with new and effective learning methods',
    source: require('@assets/img/img_tutorial_1.png'),
  },
  {
    titleVN: 'Nhanh chóng và dễ dàng học tập',
    titleEN: 'Quick and easy learning',
    descVN:
      'Học dễ dàng và nhanh chóng tại đây bất cứ lúc nào để giúp bạn cải thiện các kỹ năng khác nhau',
    descEN: 'Learn easily and quickly here at any time to help you improve various skills',
    source: require('@assets/img/img_tutorial_2.png'),
  },
  {
    titleVN: 'Trải nghiệm học tập trực tuyến',
    titleEN: 'Experience online learning',
    descVN: 'Tiếp cận học trực tuyến với phương pháp học mới mẻ, hiệu quả',
    descEN: 'Approach online learning with new and effective learning methods',
    source: require('@assets/img/img_tutorial_3.png'),
  },
];

const Introduction = ({ navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [scroll, setScroll] = useState(true);
  const scrollRef = useRef(null);
  const scrollX = useSharedValue(0);
  const position = useDerivedValue(() => scrollX.value / SNAP_INTERVAL);
  const languageLocal = useSelector((state) => state.global.language);
  /**
   * Turn on scroll
   */
  const openScroll = () => {
    setScroll(true);
  };

  const onScrollEvent = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
      if (scrollX.value / SNAP_INTERVAL > count + 0.9) {
        runOnJS(setCount)(count + 1);
      } else if (scrollX.value / SNAP_INTERVAL < count - 0.9) {
        runOnJS(setCount)(count - 1);
      }
    },
  });

  const onPressNext = useCallback(async () => {
    const isFirst = storage.getString(Constant.KEY_FIRST);
    if (isFirst === Constant.IS_FIRST) {
      navigation.navigate(Constant.LOGIN);
    } else {
      navigation.navigate(Constant.START);
    }
  }, [count]);
  return (
    <View style={[styles.main, { paddingTop: top + 20 }]}>
      <Animated.ScrollView
        ref={scrollRef}
        onMomentumScrollEnd={openScroll}
        scrollEnabled={scroll}
        horizontal
        scrollEventThrottle={16}
        bounces={false}
        style={{ flexGrow: 1 }}
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={SNAP_INTERVAL}
        onScroll={onScrollEvent}
      >
        {Array(3)
          .fill(3)
          .map((__, index) => (
            <View key={`${index + 1}`}>
              <Header index={index} imageHeader={imgHeader} imageMain={items[index]?.source} />
              <View style={styles.body}>
                <CMText
                  style={styles.title}
                  title={
                    languageLocal === Constant.LANGUAGE_VN
                      ? items[index]?.titleVN
                      : items[index]?.titleEN
                  }
                />
                <CMText
                  style={styles.desc}
                  title={
                    languageLocal === Constant.LANGUAGE_VN
                      ? items[index]?.descVN
                      : items[index]?.descEN
                  }
                />
              </View>
              <ButtonFooter
                style={[
                  styles.button,
                  {
                    bottom: bottom + 20,
                    backgroundColor: Color.base_color,
                  },
                ]}
                index={index}
                onPressNext={onPressNext}
              />
            </View>
          ))}
      </Animated.ScrollView>
      <Indicator position={position} />
    </View>
  );
};

export default Introduction;

import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { screenWidth } from '@utils/platforms';
import { horizontal } from '@utils/scales';
import { Color } from '@theme/colors';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import TouchableDebounce from '@components/TouchableDebounce';
import { loadFile } from '@utils/helpers';

const ITEM_WIDTH_SLIDE = screenWidth * 0.75;
const ITEM_HEIGHT_SLIDE = (ITEM_WIDTH_SLIDE * 169) / 311;

function areEqual(prevProps, nextProps) {
  return prevProps.listSlideBanner === nextProps.listSlideBanner;
}

const CarouselHome = ({ listSlideBanner }) => {
  const refCarousel = useRef(false);

  const renderItemCarousel = (item, index) => (
    <TouchableDebounce style={styles.viewContentItem} key={index}>
      <FastImage
        style={styles.imageItemBanner}
        source={{
          uri: loadFile(item?.url),
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
    </TouchableDebounce>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={refCarousel}
        layout="default"
        data={listSlideBanner}
        renderItem={({ item, index }) => renderItemCarousel(item, index)}
        sliderWidth={screenWidth}
        itemWidth={ITEM_WIDTH_SLIDE}
        loop
        autoplay
        inactiveSlideScale={1}
        inactiveSlideShift={0}
        useScrollView
        autoplayInterval={5000}
        enableSnap
        loopClonesPerSide={5}
        inactiveSlideOpacity={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContentItem: {
    backgroundColor: Color.transparent,
    borderRadius: 24,
    height: ITEM_HEIGHT_SLIDE,
    marginLeft: horizontal(10),
    marginRight: horizontal(10),
  },
  imageItemBanner: {
    height: ITEM_HEIGHT_SLIDE,
    borderRadius: 24,
  },
});

export default React.memo(CarouselHome, areEqual);

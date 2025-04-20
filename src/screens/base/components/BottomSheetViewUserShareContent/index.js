/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { isIOS, isTablet, screenHeight, screenWidth } from '@utils/platforms';
import TouchableDebounce from '@components/TouchableDebounce';
import IconCancel from '@assets/icons/icon_cancel.svg';
import CMText from '@components/CMText';
import { horizontal, vertical } from '@utils/scales';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const BottomSheetViewUserShareContent = (props) => {
  const { isOpenModal, closeModal, handleShareOnPress, listData, handleChangeUserShare } = props;
  const translateY = useSharedValue(screenHeight);
  const opacity = useSharedValue(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [data, setData] = useState(listData);
  useEffect(() => {
    if (isOpenModal) {
      translateY.value = withTiming(0, { duration: 500 }, () => {
        opacity.value = withTiming(1, { duration: 300 });
      });
    } else {
      opacity.value = withTiming(0, { duration: 300 }, () => {
        translateY.value = withTiming(screenHeight, { duration: 500 });
      });
    }
  }, []);
  /**
   * Get height view bottomsheet.
   * @param {} event
   */
  const onViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const onHandelShare = () => {
    handleShareOnPress();
    closeModal();
  };
  const onHandleChangeUserShare = (type, item) => {
    let newListData = [...data];
    if (type === 1) {
      const check = data.find((x) => x.userId === item?.userId);
      if (check == null) {
        newListData = [item, ...newListData];
        setData(newListData);
      }
    } else {
      const check = newListData.find((x) => x.userId === item?.userId);
      if (check != null || check !== undefined) {
        newListData = newListData.filter((x) => x.userId !== item?.userId);
        setData(newListData);
      }
    }
    handleChangeUserShare(newListData);
  };
  const translationStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const opacityStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const renderUserShare = (item, index) => (
    <View key={index}>
      <View style={styles.itemSearch}>
        <View>
          <View>
            <CMText title={`${item?.username} - ${item?.displayName}`} style={styles.label} />
          </View>
          <View style={styles.itemSearch}>
            <CMText i18nKey="text-department-name" style={styles.title} />
            <CMText title={`: ${item?.organizeTrainingName}`} style={styles.title} />
          </View>
        </View>
        <View style={styles.itemView}>
          {data.find((x) => x.username === item.username) != null ? (
            <TouchableDebounce onPress={() => onHandleChangeUserShare(0, item)}>
              <FontAwesomeIcon icon={faMinusCircle} style={styles.iconMinus} size={20} />
            </TouchableDebounce>
          ) : (
            <TouchableDebounce onPress={() => onHandleChangeUserShare(1, item)}>
              <FontAwesomeIcon icon={faPlusCircle} style={styles.iconPlus} size={20} />
            </TouchableDebounce>
          )}
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      transparent
      visible={isOpenModal}
      propagateSwipe
    >
      <Animated.View style={[styles.viewButtonSheet, translationStyles]}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#0000004D',
            },
            opacityStyles,
          ]}
        />
        <TouchableOpacity
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          activeOpacity={1}
        >
          <TouchableDebounce
            style={[
              styles.btnCancel,
              {
                bottom: viewHeight + vertical(10),
              },
            ]}
            onPress={closeModal}
          >
            <IconCancel width={24} height={24} />
          </TouchableDebounce>
          <TouchableWithoutFeedback>
            <View style={[styles.buttonSheet]} onLayout={onViewLayout}>
              <CMText i18nKey="text-list-user-get-share" style={styles.textHeader} />
              <ScrollView
                scrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
              >
                <TouchableOpacity activeOpacity={1}>
                  {data.map((item, index) => renderUserShare(item, index))}
                </TouchableOpacity>
              </ScrollView>
              <TouchableDebounce style={styles.btnShare} onPress={onHandelShare}>
                <CMText i18nKey="text-share" style={styles.textShare} />
              </TouchableDebounce>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  viewButtonSheet: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: screenHeight * 0.7,
    paddingHorizontal: horizontal(30),
    paddingVertical: vertical(15),
  },
  btnCancel: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vertical(14),
    paddingHorizontal: vertical(14),
  },
  textTitle: {
    fontSize: 20,
    color: Color.text_color,
    fontWeight: '700',
    lineHeight: 28,
  },
  textDelete: {
    fontWeight: '400',
    color: Color.base_color,
    fontSize: 12,
  },
  viewDots: {
    paddingHorizontal: horizontal(15),
  },
  btnApply: {
    backgroundColor: Color.base_color,
    height: 56,
    marginHorizontal: horizontal(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vertical(16),
    marginBottom: vertical(5),
  },
  textBtnApply: {
    fontSize: 16,
    fontWeight: '700',
    color: Color.white,
  },
  textInput: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Color.color_uncheck_answer,
    height: 240,
    textAlignVertical: 'top',
    paddingVertical: isIOS ? vertical(15) : vertical(5),
  },
  block: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Color.color_bg_tab_view,
    borderWidth: 1,
    borderColor: Color.color_gray_bm,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18),
    height: vertical(100),
  },
  viewIcon: {
    alignItems: 'center',
    padding: vertical(10),
  },
  titleFile: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    color: Color.color_check_answer,
    paddingHorizontal: horizontal(5),
    flexWrap: 'wrap',
  },
  iconFile: {
    marginLeft: 20,
    marginTop: 5,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: horizontal(18),
    flex: 1,
  },
  textUpfile: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium,
  },
  viewContent: {
    flexDirection: 'row',
    width: screenWidth - 100,
  },
  textErrorMessage: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium,
    color: Color.red,
    marginTop: vertical(16),
    marginHorizontal: horizontal(18),
  },
  buttonRemoveFile: {
    justifyContent: 'center',
  },
  boxView: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '400',
  },
  boxViewDetail: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
    justifyContent: 'space-between',
  },
  boxSearch: {
    marginHorizontal: horizontal(20),
    marginTop: vertical(20),
  },
  itemSearch: {
    flexDirection: 'row',
    marginTop: vertical(10),
  },
  boxItemSearch: {
    marginTop: vertical(15),
  },
  line: {
    height: 1,
    backgroundColor: Color.color_width_featured_class,
    marginTop: vertical(5),
  },
  itemView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  textHeader: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: vertical(15),
  },
  btnShare: {
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textShare: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
    textDecorationLine: 'underline',
  },
  iconPlus: {
    color: Color.base_color,
  },
  iconMinus: {
    color: Color.red,
  },
  scrollView: {
    height: screenHeight * 0.5,
  },
});
export default BottomSheetViewUserShareContent;

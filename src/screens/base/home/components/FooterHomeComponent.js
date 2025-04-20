import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constant from '@utils/constants';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconCalenda from '@assets/other/icon_calendar.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { checkListEmpty } from '@utils/helpers';
import { isTablet } from '@utils/platforms';
import ViewSeeAll from './ViewSeeAll';

const WIDTH_ITEM_LIST = isTablet ? 230 : 200;
const HEIGHT_ITEM_LIST = (WIDTH_ITEM_LIST * 265) / 200;
const WIDTH_IMAGE = WIDTH_ITEM_LIST - horizontal(10 * 2);
const HEIGHT_IMAGE = (WIDTH_IMAGE * 112) / 168;

const FooterHomeComponent = (props) => {
  const { listNewClass, listOutstanding, listSuggestions, navigation } = props;

  const itemNewClass = (item, index, typePress) => (
    <LinearGradient
      colors={[Color.color_home_background, Color.color_home_background, Color.white]}
      style={styles.linearGradientNewClass}
    >
      <TouchableDebounce
        style={styles.viewItemNewClass}
        onPress={() => {
          navigation.navigate(Constant.SEARCH_CLASS_DETAIL, {
            classDetail: item,
          });
        }}
      >
        <CustomImage source={item?.avatar} style={styles.imageNewClass} />
        <CMText title={item?.title} style={styles.textNewClass} numberOfLines={2} />
        <View style={styles.viewDateItem}>
          {(item?.startDate !== '' || item?.endDate !== '') && (
            <IconCalenda width={16} height={16} />
          )}
          <CMText
            title={`${item?.startDate ?? ''}${item?.endDate ? ` - ${item?.endDate}` : ''}`}
            style={styles.textDateMyClass}
            numberOfLines={1}
          />
        </View>
        <View style={styles.viewClassType}>
          <CMText title={item?.classTypeName} style={styles.textClassType} />
        </View>
      </TouchableDebounce>
    </LinearGradient>
  );
  return (
    <View style={styles.container}>
      {checkListEmpty(listNewClass) && (
        <View>
          <ViewSeeAll
            i18nKey="text-list-new-class"
            onPressSeeAll={() => {
              navigation.navigate(Constant.SEARCH_STACK, {
                screen: Constant.SEARCH_SCREEN,
                params: {
                  tabIndex: 0,
                },
              });
            }}
          />
          <FlatList
            data={listNewClass}
            renderItem={({ item, index }) => itemNewClass(item, index, 1)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {checkListEmpty(listOutstanding) && (
        <View>
          <ViewSeeAll
            i18nKey="text-list-outstanding-class"
            isSee={false}
            onPressSeeAll={() => {}}
          />
          <FlatList
            data={listOutstanding}
            renderItem={({ item, index }) => itemNewClass(item, index, 2)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {checkListEmpty(listSuggestions) && (
        <View>
          <ViewSeeAll
            i18nKey="text-list-suggestions-for-you"
            onPressSeeAll={() => {
              navigation.navigate(Constant.SEARCH_STACK, {
                screen: Constant.SEARCH_SCREEN,
                params: {
                  tabIndex: 0,
                  orderBy: 2,
                },
              });
            }}
          />
          <FlatList
            data={listSuggestions}
            renderItem={({ item, index }) => itemNewClass(item, index, 3)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradientNewClass: {
    flex: 1,
    margin: horizontal(10),
    paddingTop: horizontal(10),
    borderRadius: 16,
  },
  viewItemNewClass: {
    height: HEIGHT_ITEM_LIST,
    width: WIDTH_ITEM_LIST,
  },
  imageNewClass: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    alignSelf: 'center',
    borderRadius: 8,
  },
  textNewClass: {
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    fontSize: textSize(12),
    fontWeight: '700',
    color: Color.text_color,
    marginTop: vertical(10),
    height: vertical(35),
  },
  viewDateItem: {
    flexDirection: 'row',
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    marginTop: isTablet ? vertical(3) : vertical(5),
  },
  textDateMyClass: {
    fontSize: textSize(10),
    fontWeight: '400',
    color: Color.text_color,
    lineHeight: 16,
    paddingHorizontal: horizontal(5),
    fontFamily: fonts.regular,
  },
  viewClassType: {
    backgroundColor: Color.color_width_featured_class,
    borderRadius: 100,
    marginHorizontal: (WIDTH_ITEM_LIST - WIDTH_IMAGE) / 2,
    paddingHorizontal: horizontal(5),
    width: isTablet ? 105 : 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: vertical(10),
  },
  textClassType: {
    fontSize: textSize(10),
    fontWeight: '600',
    paddingVertical: vertical(5),
  },
});
export default FooterHomeComponent;

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { horizontal, vertical } from '@utils/scales';
import IconRegex from '@assets/icons/icon_regex_pass.svg';
import IconUnRegex from '@assets/icons/icon_unregex_pass.svg';
import CMText from '@components/CMText';
import { Color } from '@theme/colors';
import fonts from '@assets/value/fonts';

const RegexPassword = (props) => {
  /**
   * lenghtMax: chiều dài của tổng regex.
   * passRegex: tổng số regex item đã pass.
   */
  const { lenghtMax, passRegex } = props;
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    setListItem(generateArray(lenghtMax));
  }, [lenghtMax]);

  /**
   * Hàm gen ra mảng bằng tham số chuyền vào.
   * @returns
   */
  function generateArray(lenght) {
    return new Array(lenght).fill().map((_, index) => index);
  }

  /**
   * Render item
   */
  const renderItem = (item, index) => (
    <View
      style={[
        styles.viewItemUnPass,
        {
          backgroundColor: index + 1 <= passRegex ? Color.base_color : Color.color_border,
          marginLeft: index > 0 ? horizontal(15) : 0,
        },
      ]}
    />
  );
  return (
    <View styles={styles.container}>
      {passRegex > 0 && (
        <View style={styles.viewContentDots}>
          <FlatList
            data={listItem}
            renderItem={({ item, index }) => renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            scrollEnabled={false}
            contentContainerStyle={styles.viewFlatList}
          />
          {passRegex > 3 && (
            <CMText
              i18nKey="text-strong-pass"
              style={[
                styles.textStrong,
                {
                  color: Color.base_color,
                },
              ]}
            />
          )}
        </View>
      )}
      <View style={styles.viewContextRegex}>
        {passRegex > 3 ? (
          <IconRegex width={18} height={18} />
        ) : (
          <IconUnRegex width={18} height={18} />
        )}
        <CMText
          i18nKey="text-regex-password"
          style={[
            styles.textContextRegex,
            {
              color: passRegex > 3 ? Color.color_pass : Color.text_color_hover,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.base_color,
  },
  viewItemUnPass: {
    width: horizontal(40),
    height: 3,
    borderRadius: 2,
    marginVertical: vertical(10),
    backgroundColor: Color.color_border,
  },
  viewContextRegex: {
    flexDirection: 'row',
    marginHorizontal: horizontal(20),
    marginTop: vertical(10),
  },
  textContextRegex: {
    fontSize: 12,
    marginLeft: horizontal(5),
  },
  viewFlatList: {
    paddingTop: vertical(12),
  },
  viewContentDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontal(20),
  },
  textStrong: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fonts.medium,
    paddingTop: vertical(12),
  },
});
export default RegexPassword;

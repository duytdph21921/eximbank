/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import IconContentClass from '@assets/other/icon_content_class.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { calculatorTime, loadFile } from '@utils/helpers';
import { screenWidth } from '@utils/platforms';

const TreeViewTopicCustom = (props) => {
  const { data, onViewClassContent } = props;
  const languageLocal = useSelector((state) => state.global.language);

  const [expandedNodes, setExpandedNodes] = useState({}); // Quản lý trạng thái mở rộng

  useEffect(() => {
    setExpandedNodes({});
    // Neu data co gia tri thi moi lay
    if (data && data.length > 0) {
      setExpandedNodes((prevState) => ({
        ...prevState,
        [data[0]?.id]: !prevState[data[0]?.id],
      }));
    }
  }, [data]);

  // Hàm toggle mở rộng/thu gọn node
  const toggleNode = (id) => {
    setExpandedNodes((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderViewTree = (item) => {
    if (item?.level >= 1 && item?.isFolder === true)
      return (
        <View style={styles.boxViewTree}>
          <View
            style={[
              styles.viewItemLevel1,
              { width: 10 + (item?.level ?? 0) * 9 },
            ]}
          />
          <View
            style={[styles.dotTree, { left: 10 + (item?.level ?? 0) * 9 }]}
          />
        </View>
      );

    if (item?.level >= 1)
      return (
        <View style={styles.boxViewTree}>
          <View
            style={[
              styles.viewItemLevel1,
              { width: 10 + (item?.level ?? 0) * 9 },
            ]}
          />
          <View
            style={[styles.dotTree, { left: 10 + (item?.level ?? 0) * 9 }]}
          />
        </View>
      );

    return <View />;
  };

  const getTextStyle = (item) => {
    if (item?.isFolder && item?.level === 0) return styles.textLevel0;
    if (item?.isFolder && item?.level === 1) return styles.textLevel1;
    return styles.textContent;
  };

  // Hàm render từng item
  const renderItem = ({ item }) => {
    const isExpanded = expandedNodes[item.id];
    return (
      <View style={[styles.itemContainer]}>
        <View style={styles.boxViewContent}>
          <View style={item?.level === 0 ?? styles.viewLevel0}>
            {/* && item?.isFolder == true */}
            {renderViewTree(item)}
            <View
              style={[
                styles.itemContent,
                item?.level === 0
                  ? { marginLeft: 10 * (item?.level ?? 1) }
                  : { marginLeft: 10 * (item?.level ?? 1) + 50 },
              ]}
            >
              <View style={styles.marginText}>
                <View>
                  {item?.level === 0 && item?.isFolder === true ? (
                    <TouchableDebounce
                      onPress={() => {
                        toggleNode(item?.id);
                      }}
                    >
                      <IconContentClass
                        style={[
                          styles.iconContent,
                          item?.isFolder === true && {
                            marginTop: vertical(2),
                          },
                        ]}
                        width={20}
                        height={20}
                      />
                    </TouchableDebounce>
                  ) : (
                    <View />
                  )}
                </View>
                <View style={styles.flexItem}>
                  <View>
                    {item?.isFolder === false ? (
                      <View style={styles.boxViewContent}>
                        <TouchableDebounce
                          onPress={() => {
                            if (item?.isFolder === false) {
                              onViewClassContent(item);
                            } else toggleNode(item?.id);
                          }}
                        >
                          {item?.totalComment > 0 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: '95%',
                              }}
                            >
                              <CMText
                                style={[
                                  getTextStyle(item),
                                  {
                                    width: screenWidth - 2 * (5 * (item?.level ?? 1) + 50),
                                  },
                                ]}
                                title={`${item?.title} (${item?.totalComment})`}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                width: '95%',
                              }}
                            >
                              <CMText
                                style={[
                                  getTextStyle(item),
                                  {
                                    width: screenWidth - 2 * (5 * (item?.level ?? 1) + 50),
                                  },
                                ]}
                                title={`${item?.title}`}
                              />
                            </View>
                          )}
                          {item?.usernameTopic && (
                            <View style={styles.lastestTopic}>
                              <View style={{ flexDirection: 'row' }}>
                                <CMText i18nKey="text-lastest" style={styles.textLastest} />
                                <CMText title={`: ${item?.titleTopic}`} style={styles.titleTopic} />
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: vertical(10),
                                }}
                              >
                                {item?.avatarTopic ? (
                                  <FastImage
                                    source={{ uri: loadFile(item?.avatarTopic) }}
                                    resizeMode="contain"
                                    style={styles.avatarProfile}
                                  />
                                ) : (
                                  <FastImage
                                    source={require('@assets/img/avatar-detail.png')}
                                    resizeMode="contain"
                                    style={styles.avatarProfile}
                                  />
                                )}
                                <CMText
                                  title={item?.displayNameTopic}
                                  style={[styles.displayNameTopic, { marginLeft: horizontal(10) }]}
                                />
                                <View style={styles.dot} />
                                <CMText
                                  title={calculatorTime(item?.createdDateTopic, languageLocal)}
                                  style={styles.displayNameTopic}
                                />
                              </View>
                            </View>
                          )}
                        </TouchableDebounce>
                      </View>
                    ) : (
                      <View>
                        <TouchableDebounce
                          onPress={() => {
                            if (item?.isFolder === false) onViewClassContent(item);
                            else toggleNode(item?.id);
                          }}
                        >
                          <CMText
                            style={[
                              getTextStyle(item),
                              { width: screenWidth - 2 * (5 * (item?.level ?? 1) + 50) },
                            ]}
                            title={item?.title}
                          />
                        </TouchableDebounce>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Nếu node có cấp con và đang được mở rộng, render danh sách con */}
        {item?.hasChildren && isExpanded && (
          <FlatList
            data={item.childs}
            renderItem={renderItem}
            keyExtractor={(child) => child.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.boxContent}
      showsVerticalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  boxContent: {
    marginVertical: vertical(5),
    marginHorizontal: horizontal(24),
  },
  flexItem: {
    flexDirection: 'row',
  },
  iconContent: {
    marginRight: horizontal(5),
  },
  viewLevel0: {
    position: 'relative',
  },
  viewItemLevel1: {
    position: 'absolute',
    height: 1,
    left: 0,
    width: 16,
    backgroundColor: Color.color_width_featured_class,
    top: 10,
  },
  viewItemLevelChild: {
    borderLeftWidth: 1,
    borderLeftColor: Color.color_width_featured_class,
    position: 'absolute',
    height: '100%',
    width: 16,
    left: 30,
    borderRadius: 0.01,
  },
  textLevel0: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26.4,
    flexWrap: 'wrap',
  },
  textLevel1: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 23.8,
    flexWrap: 'wrap',
  },
  textContent: {
    fontFamily: fonts.semi,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4,
    flexWrap: 'wrap',
  },
  dotTree: {
    width: 5,
    height: 5,
    backgroundColor: Color.color_width_featured_class,
    position: 'absolute',
    top: 8,
    borderRadius: 5,
  },
  itemContent: {
    flexDirection: 'row',
    // alignItems: "flex-start",
    justifyContent: 'space-between',
  },
  iconFinish: {
    marginRight: 8,
  },
  textContentType: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
  },
  marginText: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  boxViewTree: {
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    position: 'absolute',
    height: '100%',
    width: 16,
    left: 30,
  },
  itemContentType: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: vertical(4),
  },
  icon: {
    marginRight: horizontal(5),
  },
  boxViewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconDownload: {
    alignSelf: 'flex-end',
  },
  lastestTopic: {
    padding: 8,
    backgroundColor: Color.color_bg_tab_view,
    width: screenWidth,
  },
  titleTopic: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
    flex: 1,
    flexWrap: 'wrap',
  },
  textLastest: {
    fontFamily: fonts.medium,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 20.4,
  },
  avatarProfile: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  displayNameTopic: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
    color: Color.text_color_hover,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: Color.text_color_hover,
    borderRadius: 5,
    marginHorizontal: horizontal(10),
    marginTop: 5,
  },
});
export default TreeViewTopicCustom;

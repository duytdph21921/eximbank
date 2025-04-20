import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { horizontal, vertical } from '@utils/scales';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import { GetTypeContent } from '@utils/helpers';
import IconFinish from '@assets/other/icon_finish_content.svg';
import IconNotFinish from '@assets/other/icon_not_finish_content.svg';
import IconContentClass from '@assets/other/icon_content_class.svg';
import TouchableDebounce from '@components/TouchableDebounce';
import IconVideo from '@assets/icons/icon_video.svg';
import IconExam from '@assets/icons/icon_exam.svg';
import IconSurvey from '@assets/icons/icon_survey.svg';
import IconDocument from '@assets/icons/icon_document_content.svg';
import { Color } from '@theme/colors';
import IconLiveClass from '@assets/icons/icon_live_class.svg';
import IconChevronDown from '@assets/icons/chevron-down.svg';
import IconChevronUp from '@assets/icons/chevron-up.svg';
import { screenWidth } from '@utils/platforms';
import IconScormTincan from '@assets/icons/icon_scorm_tincan.svg';
import IconLink from '@assets/icons/icon_link.svg';
import IconTepnen from '@assets/icons/icon_tepnen.svg';
import IconImage from '@assets/icons/icon_image.svg';
import IconAudio from '@assets/icons/icon_audio.svg';
import IconTextHtml from '@assets/icons/icon_html.svg';
import IconOffline from '@assets/icons/icon_offline.svg';
import IconExercise from '@assets/icons/icon_exercise.svg';

const TreeViewCustom = (props) => {
  const { data, onViewClassContent, isViewResult = false } = props;
  const [expandedNodes, setExpandedNodes] = useState({}); // Quản lý trạng thái mở rộng
  const renderContentType = (typeId) => {
    if (typeId === GetTypeContent.video) {
      return (
        <View style={styles.itemContentType}>
          <IconVideo width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-video" />
        </View>
      );
    }
    if (typeId === GetTypeContent.test) {
      return (
        <View style={styles.itemContentType}>
          <IconExam width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-exam" />
        </View>
      );
    }
    if (typeId === GetTypeContent.survey) {
      return (
        <View style={styles.itemContentType}>
          <IconSurvey width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-survey" />
        </View>
      );
    }
    if (typeId === GetTypeContent.document) {
      return (
        <View style={styles.itemContentType}>
          <IconDocument width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-document" />
        </View>
      );
    }
    if (
      typeId === GetTypeContent.liveClass ||
      typeId === GetTypeContent.zoom ||
      typeId === GetTypeContent.GGMeet ||
      typeId === GetTypeContent.MSTeam
    ) {
      return (
        <View style={styles.itemContentType}>
          <IconLiveClass width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-liveclass" />
        </View>
      );
    }
    if (typeId === GetTypeContent.tincam || typeId === GetTypeContent.scorm) {
      return (
        <View style={styles.itemContentType}>
          <IconScormTincan width={16} height={16} style={styles.icon} />
          {typeId === GetTypeContent.tincam && (
            <CMText style={styles.textContentType} i18nKey="text-tincan" />
          )}
          {typeId === GetTypeContent.scorm && (
            <CMText style={styles.textContentType} i18nKey="text-scorm" />
          )}
        </View>
      );
    }
    if (typeId === GetTypeContent.link) {
      return (
        <View style={styles.itemContentType}>
          <IconLink width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-link" />
        </View>
      );
    }
    if (typeId === GetTypeContent.zip) {
      return (
        <View style={styles.itemContentType}>
          <IconTepnen width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-tepnen" />
        </View>
      );
    }
    if (typeId === GetTypeContent.image) {
      return (
        <View style={styles.itemContentType}>
          <IconImage width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-image" />
        </View>
      );
    }
    if (typeId === GetTypeContent.audio) {
      return (
        <View style={styles.itemContentType}>
          <IconAudio width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-audio" />
        </View>
      );
    }
    if (typeId === GetTypeContent.textHtml) {
      return (
        <View style={styles.itemContentType}>
          <IconTextHtml width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-html" />
        </View>
      );
    }
    if (typeId === GetTypeContent.offline) {
      return (
        <View style={styles.itemContentType}>
          <IconOffline width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-offline" />
        </View>
      );
    }
    if (typeId === GetTypeContent.exercise) {
      return (
        <View style={styles.itemContentType}>
          <IconExercise width={16} height={16} style={styles.icon} />
          <CMText style={styles.textContentType} i18nKey="text-exercise-class" />
        </View>
      );
    }
    return null;
  };
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

  const getFinishIcon = (item) => {
    if (item?.isFinish && !item?.isFolder && !isViewResult) {
      return <IconFinish style={styles.iconFinish} width={26} height={26} />;
    }
    if (!item?.isFinish && !item?.isFolder && !isViewResult) {
      return <IconNotFinish style={styles.iconFinish} width={26} height={26} />;
    }
    return <View />;
  };

  const getTextStyle = (item) => {
    if (item?.isFolder && item?.level === 0) return styles.textLevel0;
    if (item?.isFolder && item?.level === 1) return styles.textLevel1;
    return styles.textContent;
  };

  const renderTreeLine = (item) => {
    if (item?.level < 1) return <View />;

    return (
      <View style={styles.boxViewTree}>
        <View style={[styles.viewItemLevel1, { width: 5 + item?.level * 9 }]} />
        <View style={[styles.dotTree, { marginLeft: 5 + item?.level * 9 }]} />
      </View>
    );
  };

  // Hàm render từng item
  const renderItem = ({ item, index }) => {
    const isExpanded = expandedNodes[item.id];
    return (
      <View style={[styles.container]}>
        <View style={styles.flexItem}>
          <View style={item?.level === 0 ?? styles.viewLevel0}>
            {renderTreeLine(item)}
            <View
              style={[
                styles.itemContent,
                { marginLeft: item?.level === 0 ? 5 * item?.level : 5 * item?.level + 50 },
              ]}
            >
              {getFinishIcon(item)}
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
                <View>
                  {item?.isFolder === false ? (
                    <View style={styles.boxViewContent}>
                      <TouchableDebounce
                        onPress={() => {
                          if (item?.isFolder === false && !isViewResult) onViewClassContent(item);
                        }}
                      >
                        <View style={{ flexDirection: 'row', position: 'relative' }}>
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
                                { width: screenWidth - 2 * (5 * item?.level + 50) },
                              ]}
                              title={item?.title}
                            />
                          </View>
                          {item?.childs?.length > 0 &&
                            !expandedNodes[item?.id] &&
                            item?.level >= 1 && (
                              <View
                                style={{
                                  marginTop: horizontal(3),
                                  marginLeft: vertical(-5),
                                }}
                              >
                                <IconChevronDown width={20} height={20} />
                              </View>
                            )}
                          {item?.childs?.length > 0 &&
                            expandedNodes[item?.id] &&
                            item?.level >= 1 && (
                              <View
                                style={{
                                  marginTop: horizontal(3),
                                  marginLeft: vertical(-5),
                                }}
                              >
                                <IconChevronUp width={20} height={20} />
                              </View>
                            )}
                        </View>
                        {/* {item?.isDownload && (
                                  <View style={styles.iconDownload}>
                                    <IconDownload width={29} height={29} />
                                  </View>
                                )} */}
                        {renderContentType(item?.typeId)}
                      </TouchableDebounce>
                    </View>
                  ) : (
                    <View>
                      <TouchableDebounce
                        onPress={() => {
                          if (item?.isFolder === false && !isViewResult) onViewClassContent(item);
                          else toggleNode(item?.id);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
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
                                { width: screenWidth - 2 * (5 * item?.level + 50) },
                              ]}
                              title={item?.title}
                            />
                          </View>
                          {item?.childs?.length > 0 &&
                            !expandedNodes[item?.id] &&
                            item?.level >= 1 && (
                              <View
                                style={{
                                  marginTop: horizontal(3),
                                  marginLeft: vertical(-5),
                                }}
                              >
                                <IconChevronDown width={20} height={20} />
                              </View>
                            )}
                          {item?.childs?.length > 0 &&
                            expandedNodes[item?.id] &&
                            item?.level >= 1 && (
                              <View
                                style={{
                                  marginTop: horizontal(3),
                                  marginLeft: vertical(-5),
                                }}
                              >
                                <IconChevronUp width={20} height={20} />
                              </View>
                            )}
                        </View>
                      </TouchableDebounce>
                      {renderContentType(item?.typeId)}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Nếu node có cấp con và đang được mở rộng, render danh sách con */}
        {item?.childs?.length > 0 && isExpanded && (
          <FlatList
            data={item?.childs}
            renderItem={renderItem}
            keyExtractor={(child) => child.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.boxContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  boxContent: {
    marginVertical: vertical(12),
    marginLeft: horizontal(20),
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
    top: 12,
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
    top: 10,
    borderRadius: 5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    left: 25,
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
});

export default TreeViewCustom;

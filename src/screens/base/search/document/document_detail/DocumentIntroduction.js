import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Constant from '@utils/constants';
import { isIOS, isTablet, screenWidth } from '@utils/platforms';
import { horizontal, textSize, vertical } from '@utils/scales';
import IconClock from '@assets/icons/icon_clock.svg';
import IconVideo from '@assets/icons/icon_video.svg';
import IconDownload from '@assets/other/icon_download.svg';
import IconShare from '@assets/other/icon_share.svg';
import IconView from '@assets/other/icon_view.svg';
import IconLike from '@assets/other/like_icon.svg';
import fonts from '@assets/value/fonts';
import CMText from '@components/CMText';
import CustomImage from '@components/CustomImage';
import TouchableDebounce from '@components/TouchableDebounce';
import { Color } from '@theme/colors';
import { GetTypeName, loadFile, replaceHtml, downloadFile } from '@utils/helpers';
import { getById, updateDownload, updateLike } from '@services/lms/lmscontent.api';
import { updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import he from 'he';
import globalStyles from '@theme/globalStyles';

const IMAGE_WIDTH = screenWidth - horizontal(24 * 2);
const IMAGE_HEIGHT = (IMAGE_WIDTH * 150) / 327;
const RenderDocumentData = ({
  icon,
  i18nKey,
  numberData,
  navigation,
  updateDownloadContent,
  updatelikeContent,
  contentDetail,
}) => (
  <View>
    {icon === 'like' && (
      <TouchableDebounce
        onPress={() => {
          updatelikeContent();
        }}
        style={styles.boxData}
      >
        <IconLike
          style={{ marginRight: 4 }}
          width={16}
          height={16}
          fill={contentDetail?.isUserLike ? Color.base_color : Color.white}
        />
        <CMText style={[styles.textBoxData, { marginRight: 4 }]} i18nKey={i18nKey} />
        <CMText style={styles.textBoxData} title={`(${numberData})`} />
      </TouchableDebounce>
    )}
    {icon === 'share' && (
      <TouchableDebounce
        onPress={() => {
          navigation.navigate(Constant.SEARCH_CONTENT_SHARE, {
            item: contentDetail,
          });
        }}
        style={styles.boxData}
      >
        <IconShare style={{ marginRight: 4 }} width={16} height={16} />
        <CMText style={[styles.textBoxData, { marginRight: 4 }]} i18nKey={i18nKey} />
        <CMText style={styles.textBoxData} title={`(${numberData})`} />
      </TouchableDebounce>
    )}
    {icon === 'view' && (
      <View style={styles.boxData}>
        <IconView style={{ marginRight: 4 }} width={16} height={16} />
        <CMText style={[styles.textBoxData, { marginRight: 4 }]} i18nKey={i18nKey} />
        <CMText style={styles.textBoxData} title={`(${numberData})`} />
      </View>
    )}
    {icon === 'download' && (
      <TouchableDebounce
        onPress={() => {
          updateDownloadContent();
        }}
        style={styles.boxData}
      >
        <IconDownload style={{ marginRight: 4 }} width={16} height={16} />
        <CMText style={[styles.textBoxData, { marginRight: 4 }]} i18nKey={i18nKey} />
        <CMText style={styles.textBoxData} title={`(${numberData})`} />
      </TouchableDebounce>
    )}
  </View>
);
const RenderDocumentInfo = ({ icon, textInfo, contentDetail }) => (
  <View style={styles.boxInfo}>
    {icon === 'avatar' && (
      <CustomImage style={styles.imageItemClass} source={contentDetail?.avatarUserCreated} />
    )}
    {icon === 'time' && <IconClock style={styles.iconInfo} width={24} height={24} />}
    {icon === 'type' && <IconVideo style={styles.iconInfo} width={24} height={24} />}
    <CMText style={styles.textInfo} title={textInfo} />
  </View>
);
const DocumentIntroduction = (props) => {
  const { navigation, contentInfo } = props;
  const dispatch = useDispatch();
  const isMounteRef = useRef(false);
  const source = {
    html: contentInfo?.description ?? '',
  };
  const [contentDetail, setContentDetail] = useState(contentInfo);
  const gotoViewContent = (item) => {
    // if (item?.typeId === GetTypeContent.video) {
    //   navigation.navigate(Constant.VIDEO_MEDIA_SCREEN, {
    //     fileId: item?.fileId,
    //   });
    // } else {
    //   navigation.navigate(Constant.CONTENT_VIEW_DETAIL, {
    //     content: item,
    //   });
    // }
    navigation.navigate(Constant.CONTENT_VIEW_DETAIL, {
      content: item,
    });
  };
  const funcGetContentById = async () => {
    const response = await getById(contentDetail?.id);
    if (response?.status) {
      if (isMounteRef.current) {
        setContentDetail(response?.data);
      }
    }
  };

  const updatelikeContent = async () => {
    isMounteRef.current = true;
    const response = await updateLike(contentDetail?.id);
    if (response?.status) {
      funcGetContentById();
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-tab-notification',
          keyMessage: 'text-action-false',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false,
        }),
      );
    }
  };
  const updateDownloadContent = async () => {
    isMounteRef.current = true;
    const response = await updateDownload(contentDetail?.id);
    if (response?.status) {
      downloadFile(contentDetail?.fileId, dispatch);
      funcGetContentById();
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-tab-notification',
          keyMessage: response?.code ?? 'text-action-false',
          contentMessage: '',
          isShowCancel: false,
          isShowSubmit: false,
        }),
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxContent}>
        <View style={styles.boxImage}>
          <CustomImage style={styles.imageContent} source={contentDetail?.avatar} />
        </View>
        <View style={styles.boxDataView}>
          <RenderDocumentData
            icon="like"
            i18nKey="text-like"
            numberData={contentDetail?.totalLike}
            navigation={navigation}
            updatelikeContent={updatelikeContent}
            contentDetail={contentDetail}
            updateDownloadContent={updateDownloadContent}
          />
          <View style={styles.fillView} />
          <RenderDocumentData
            icon="share"
            i18nKey="text-share"
            numberData={contentDetail?.totalShare}
            navigation={navigation}
            updatelikeContent={updatelikeContent}
            contentDetail={contentDetail}
            updateDownloadContent={updateDownloadContent}
          />
          <View style={styles.fillView} />
          <RenderDocumentData
            icon="view"
            i18nKey="text-view"
            numberData={contentDetail?.totalView}
            navigation={navigation}
            updatelikeContent={updatelikeContent}
            contentDetail={contentDetail}
            updateDownloadContent={updateDownloadContent}
          />
          <View style={styles.fillView} />
          <RenderDocumentData
            icon="download"
            i18nKey="text-download"
            numberData={contentDetail?.totalDownload}
            navigation={navigation}
            updatelikeContent={updatelikeContent}
            contentDetail={contentDetail}
            updateDownloadContent={updateDownloadContent}
          />
        </View>
        <View style={{ marginVertical: vertical(15) }}>
          <CMText style={styles.textTitle} title={contentDetail?.title} />
        </View>
        <View>
          <RenderDocumentInfo
            icon="avatar"
            textInfo={contentDetail?.displayNameCreated}
            contentDetail={contentDetail}
          />
          <RenderDocumentInfo
            icon="time"
            textInfo={`Ngày đăng: ${contentDetail?.createdDate}`}
            contentDetail={contentDetail}
          />
          <RenderDocumentInfo
            icon="type"
            textInfo={`Định dạng: ${GetTypeName(contentDetail?.typeId)}`}
            contentDetail={contentDetail}
          />
        </View>
        <View>
          {(source.html != null || source.html !== '') && (
            <CMText
              title={`${he.decode(replaceHtml(source.html ?? ''))} `}
              style={globalStyles.textNomal}
            />
          )}
        </View>
        <TouchableDebounce
          onPress={() => {
            gotoViewContent(contentDetail);
          }}
          style={[
            styles.btnView,
            {
              backgroundColor: Color.base_color,
            },
          ]}
        >
          <CMText style={styles.textView} i18nKey="text-view-content" />
        </TouchableDebounce>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxContent: {
    marginHorizontal: horizontal(24),
  },
  imageAvatar: {
    width: 24,
    height: 24,
    marginRight: horizontal(8),
    borderRadius: 24,
  },
  imageContent: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    borderRadius: 16,
  },
  boxImage: {
    marginBottom: vertical(16),
  },
  boxData: {
    flexDirection: 'row',
    paddingHorizontal: horizontal(12),
    paddingVertical: vertical(4),
  },
  boxDataView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBoxData: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 16,
  },
  fillView: {
    height: 16,
    width: 1,
    backgroundColor: Color.color_width_featured_class,
    alignSelf: 'center',
  },
  textTitle: {
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: textSize(20),
    lineHeight: textSize(35),
  },
  boxInfo: {
    flexDirection: 'row',
    marginBottom: vertical(16),
  },
  iconInfo: {
    marginRight: horizontal(8),
  },
  textInfo: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 20.4,
  },
  btnView: {
    width: screenWidth - horizontal(24 * 2),
    height: isTablet ? 65 : 56,
    paddingHorizontal: horizontal(16),
    paddingVertical: vertical(10),
    borderRadius: 100,
    backgroundColor: Color.base_color,
    marginTop: 8,
  },
  textView: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 28,
  },
});
const mixedStyle = {
  p: {
    color: Color.text_color,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: fonts.medium,
    lineHeight: 23.8,
  },
};
export default DocumentIntroduction;

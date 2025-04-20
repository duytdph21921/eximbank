import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constant from '@utils/constants';
import { screenWidth } from '@utils/platforms';
import { horizontal, vertical } from '@utils/scales';
import CustomImage from '@components/CustomImage';
import ViewPlayAudio from '@components/ViewPlayAudio';
import { mediaType } from '@utils/helpers';

const WIDTH_IMAGE = screenWidth - horizontal(20 * 2);
const RATE_IMAGE = 163 / 326;

/**
 * Hiển thị type media của câu hỏi.
 * @param {*} props
 * @returns
 */
const RenderMediaType = (props) => {
  const { mediaTypeName, mediaUrl, refPlay } = props;
  let mediaTypeNameCurr = mediaTypeName;
  if (!mediaTypeName) {
    mediaTypeNameCurr = mediaType(mediaUrl);
  }
  return (
    <View>
      {Constant.MEDIA_IMAGE.includes(mediaTypeNameCurr) === true && (
        <CustomImage source={mediaUrl} style={styles.imageQuestion} />
      )}
      {Constant.MEDIA_AUDIO.includes(mediaTypeNameCurr) === true && (
        <ViewPlayAudio fileId={mediaUrl} refPlay={refPlay} />
      )}
      {Constant.MEDIA_VIDEO.includes(mediaTypeNameCurr) === true && <View />}
      {!Constant.MEDIA_IMAGE.includes(mediaTypeNameCurr) &&
        !Constant.MEDIA_AUDIO.includes(mediaTypeNameCurr) &&
        !Constant.MEDIA_VIDEO.includes(mediaTypeNameCurr) && <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  imageQuestion: {
    marginTop: vertical(20),
    width: WIDTH_IMAGE,
    height: WIDTH_IMAGE * RATE_IMAGE,
  },
});
export default RenderMediaType;

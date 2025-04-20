import Constant from '@utils/constants';
import { enviroment } from '@assets/enviroment/enviroment.default';
import { Color } from '@theme/colors';
import { updateLoadingAction, updateShowDialogWarnAction } from '@store/reducers/globalSlice';
import { store } from '@store';
import { resetAccessToken, resetUserAction } from '@store/reducers/authSlice';
import { isIOS } from '@utils/platforms';
import RNFS from 'react-native-fs';

export const handleErrors = (response) => {
  switch (response?.status) {
    case 401:
      // handle reset access token
      // Thong bao cho nguoi dung biet la het phien
      store.dispatch(resetAccessToken());
      store.dispatch(resetUserAction());
      // store.dispatch(
      //   updateShowDialogWarnAction({
      //     isShowModalWarn: true,
      //     isSigout: true,
      //     titleHeader: '',
      //     keyHeader: 'text-warning',
      //     keyMessage: '401',
      //     contentMessage: '',
      //     isShowCancel: false,
      //   }),
      // );
      // return store.dispatch(resetAccessToken());
      break;
    case 400: {
      let messErr = response?.data?.error_description;
      if (!messErr) {
        messErr = '400';
      }
      store.dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: true,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: messErr,
          contentMessage: '',
          isShowCancel: false,
        }),
      );
      break;
    }
    default:
      break;
  }
};

/**
 *
 * @param {*} error
 * @param {*} dispatch
 */
export function callApiError(error, dispatch) {
  dispatch(updateLoadingAction(false));
  if (error != null) {
    if (error?.response?.status) {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: Constant.DATA_LOGOUT.includes(error?.response?.status),
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: `${error.response.status}`,
          contentMessage: '',
          isShowCancel: false,
        }),
      );
    } else {
      dispatch(
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'text-warning',
          keyMessage: '500',
          contentMessage: '',
          isShowCancel: false,
        }),
      );
    }
  }
}

export const GetTypeContent = {
  video: 'c2a2e16a-a364-42b6-804e-66eb96905304',
  textHtml: 'b196bfc0-591d-497d-9128-87e2746b9494',
  document: '22f7f46e-acc2-4259-899a-950c3cd69efb',
  image: 'e22e50d7-2e02-4e78-88a7-e6c1e9b88a83',
  zip: '4f659b1a-89cb-48b7-93ee-a91ca32df720',
  scorm: '37d237c9-3433-4709-af38-3cc65718c429',
  tincam: '1669e60c-3a96-4efc-b4ea-18411ec328ba',
  survey: '7bd609d4-33bb-43e2-8c1d-c5bf008780bf',
  test: 'b6421bc8-2324-4510-9217-68babde82313',
  link: 'df07d9ba-e605-450d-87f3-8e474983f314',
  offline: '42ee141a-f4dc-457e-a487-fc655fdc5506',
  iframe: 'f18d633f-d0fa-4ce4-ad31-4a2490a5b70c',
  liveClass: '9eb8b48a-c3d2-4a3e-955c-2caae0491166',
  exercise: '52873673-4c0e-497f-86b4-5de217f44bf0',
  GGMeet: 'a8093e5b-8fd0-4460-8fb8-56e98fdb33e3',
  MSTeam: '28639bc1-bfa2-4702-b6b2-d8c65c2dd721',
  audio: 'ea753f0a-56e3-4ecc-a716-409a7e99c500',
  zoom: '16acb3c7-291b-4f0b-9f43-e5931f61943a',
};

export function GetTypeName(typeId) {
  switch (typeId) {
    case GetTypeContent.GGMeet:
      return 'Google Meet';
    case GetTypeContent.MSTeam:
      return 'MS Teams';
    case GetTypeContent.audio:
      return 'Audio (mp3)';
    case GetTypeContent.document:
      return 'Document';
    case GetTypeContent.exercise:
      return 'Bài tập';
    case GetTypeContent.iframe:
      return 'Iframe';
    case GetTypeContent.image:
      return 'Hình ảnh';
    case GetTypeContent.link:
      return 'Link';
    case GetTypeContent.liveClass:
      return 'Live Class';
    case GetTypeContent.offline:
      return 'Buổi Offline';
    case GetTypeContent.scorm:
      return 'Scorm';
    case GetTypeContent.survey:
      return 'Khảo sát';
    case GetTypeContent.test:
      return 'Bài kiểm tra / thi';
    case GetTypeContent.textHtml:
      return 'Text/Html';
    case GetTypeContent.tincam:
      return 'TinCan (xAPI)';
    case GetTypeContent.video:
      return 'Video (mp4)';
    case GetTypeContent.zip:
      return 'Tập nén';
    case GetTypeContent.zoom:
      return 'Zoom';
    default:
      return 'Không xác định';
  }
}

export function loadFile(url) {
  const baseUrl = store.getState().auth?.baseURL;
  const linkFile = `${baseUrl}${enviroment.apiDomain.uploadEndpoint}${url}`;
  return linkFile;
}

export function checkListEmpty(dataArray) {
  return dataArray && dataArray.length > 0;
}

/**
 *
 * @param {*} time // Thời gian: 2024-05-09T04:06:12.873Z
 * @param {*} typeLanguage // Loại ngôn ngữ
 * @returns
 */
export const calculatorTime = (time, typeLanguage) => {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)}${typeLanguage === Constant.LANGUAGE_VN ? ' năm' : ' year'}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)}${typeLanguage === Constant.LANGUAGE_VN ? ' tháng' : ' month'}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)}${typeLanguage === Constant.LANGUAGE_VN ? ' ngày' : ' day'}`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)}${typeLanguage === Constant.LANGUAGE_VN ? ' giờ' : ' hour'}`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)}${typeLanguage === Constant.LANGUAGE_VN ? ' phút' : ' min'}`;
  }
  return typeLanguage === Constant.LANGUAGE_VN ? 'vừa xong' : 'now';
};

export const formatTimeSeek = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  if (hours !== 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const replaceHtml = (textHtml) => textHtml.replace(/<[^>]+>|[\n\t]/g, '');

/**
 * Hàm check danh sách khảo sát với những câu hỏi bắt buộc trả lời.
 * @param {*} listSurvey
 */

export function checkSurveyRequiredEmpty(listSurvey) {
  return listSurvey.every((survey) =>
    survey.lmsSurveyQuestions.every((question) => {
      if (question.required !== Constant.IS_REQUIRED) {
        return true;
      }

      if (
        [
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1,
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2,
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3,
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4,
        ].includes(question?.type) &&
        question.answerData
      ) {
        return question.answerData.some((x) => x.selected === true);
      }

      if (
        [
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5,
          Constant.LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6,
        ].includes(question?.type) &&
        question.subContentData
      ) {
        return question.subContentData.some(
          (subContent) =>
            subContent.answerData && subContent.answerData.some((x) => x.selected === true),
        );
      }

      return true;
    }),
  );
}

function hexToRgba(hex, alpha) {
  const hexReplace = hex.replace(/^#/, '');
  const r = parseInt(hexReplace.substring(0, 2), 16);
  const g = parseInt(hexReplace.substring(2, 4), 16);
  const b = parseInt(hexReplace.substring(4, 6), 16);
  let a = 1;
  if (alpha !== undefined) {
    a = alpha;
  }
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 *
 * @param {*} color : màu base.
 * @param {*} opacity : độ mờ của màu base.
 * @returns
 */
export const changeColor = (color = Color.base_color, opacity = 0.3) => {
  const newColor = hexToRgba(color, opacity);
  return newColor;
};

export const mediaType = (fileName) => {
  let type = '';
  if (fileName) {
    type = fileName.split('.').pop().toLowerCase();
  }
  return type;
};

export function fileType(fileName) {
  let type = '';
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'doc':
    case 'docx':
      type = 'word';
      break;
    case 'xls':
    case 'xlsx':
      type = 'excel';
      break;
    case 'ppt':
    case 'pptx':
      type = 'ppt';
      break;
    case 'pdf':
      type = 'pdf';
      break;
    case 'mp4':
      type = 'mp4';
      break;
    case 'mp3':
      type = 'mp3';
      break;
    case 'mov':
      type = 'mov';
      break;
    case 'zip':
    case 'rar':
      type = 'zip/rar';
      break;
    case 'jpg':
    case 'jpeg':
    case 'png':
      type = 'jpg/png';
      break;
    default:
      type = 'other';
      break;
  }
  return type;
}

export const logDev = (...args) => {
  // __DEV__ && console.log(...args);
};

export const downloadFile = async (url, dispatch) => {
  if (url) {
    const fileName = url?.split('/').pop();
    const urlFile = loadFile(url);
    let filePath = isIOS
      ? `${RNFS.DocumentDirectoryPath}/${fileName}` // iOS: DocumentDirectoryPath
      : `${RNFS.DownloadDirectoryPath}/${fileName}`; // Android: DownloadDirectoryPath
    if (!isIOS) {
      const filePathAndroid = `${RNFS.DownloadDirectoryPath}/Elearning`;
      const checkExisPath = await RNFS.exists(filePathAndroid);
      if (!checkExisPath) {
        await RNFS.mkdir(filePathAndroid);
      }
      filePath = `${filePathAndroid}/${fileName}`;
    }
    RNFS.downloadFile({
      fromUrl: urlFile,
      toFile: filePath,
      background: false,
      discretionary: true,
      connectionTimeout: 30 * 1000,
      readTimeout: 30 * 1000,
      resumable: () => false,
      begin: () => {},
      progress: () => {},
    })
      .promise.then((response) => {
        if (response?.statusCode === 200) {
          dispatch(
            updateShowDialogWarnAction({
              isShowModalWarn: true,
              isSigout: false,
              titleHeader: '',
              keyHeader: 'text-title-download-success',
              keyMessage: '',
              keyCancel: 'text-close',
              contentMessage: filePath,
              isShowCancel: true,
              isShowSubmit: false,
            }),
          );
        }
      })
      .catch(() => {
        updateShowDialogWarnAction({
          isShowModalWarn: true,
          isSigout: false,
          titleHeader: '',
          keyHeader: 'INTERNAL_ERROR',
          keyMessage: '',
          contentMessage: '!',
          isShowCancel: false,
          isShowSubmit: false,
        });
      });
  } else {
    dispatch(
      updateShowDialogWarnAction({
        isShowModalWarn: true,
        isSigout: false,
        titleHeader: '',
        keyHeader: 'INTERNAL_ERROR',
        keyMessage: '',
        contentMessage: '',
        isShowCancel: false,
        isShowSubmit: true,
      }),
    );
  }
};

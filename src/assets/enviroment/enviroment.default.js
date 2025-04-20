import Constant from '@utils/constants';
import { storage } from '@utils/storage';
import { domain } from './domain';

const tagName = storage.getString(Constant.TAG_NAME);
export const enviroment = {
  apiDomain: {
    get loginEndpoint() {
      return `/${tagName}authentication.api/connect/token`;
    },
    get authenticationEndpoint() {
      return `/${tagName}authentication.api/api/v1`;
    },
    get lmsFrontEndpoint() {
      return `/${tagName}lms.frontend.api/api/v1`;
    },
    get lmsEndpoint() {
      return `/${tagName}lms.api/api/v1`;
    },
    get hrEndpoint() {
      return `/${tagName}hr.api/api/v1`;
    },
    get testRegistorFrontEndEndpoint() {
      return `/${tagName}test.registorfrontend.api/api/v1`;
    },
    get uploadEndpoint() {
      return `/${tagName}file.api/uploads/`;
    },
    get slideEndpoint() {
      return `/${tagName}slide.api/api/v1`;
    },
    get notificationEndpoint() {
      return `/${tagName}notification.api/api/v1`;
    },
    get fileEndpoint() {
      return `/${tagName}file.api/api/v1`;
    },
    get uploadFile() {
      return `/${tagName}file.api/api/v1`;
    },
    get webHook() {
      return `/${tagName}notification.api/socket/hubs/notification`;
    },
    get logEndpoint() {
      return `/${tagName}log.api/api/v1`;
    },
    get lrsEndpoint() {
      return `/${tagName}lms.api/socket/hubs/lrs`;
    },
    get testClassfrontend() {
      return `/${tagName}test.classfrontend.api/api/v1`;
    },
    get settingsEndpoint() {
      return `/${tagName}settings.api/api/v1`;
    },
    get testRegistorFrontEndSocketEndpoint() {
      return `/${tagName}test.registorfrontend.api/socket/hubs/test`;
    },
    get doMainApp() {
      return `${domain}`;
    },
  },
};

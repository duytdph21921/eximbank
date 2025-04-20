/* eslint-disable no-useless-escape */
export default {
  regexPassword: /^[a-zA-Z0-9]{8,}$/,
  regexEmail:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  registerGmailRegex: /^[^@]*@[^@]*$/,
  regexPhone: /^\+?[0-9]+$/,
  regexUsername: /^[a-zA-Z0-9@.]+$/,
  regexNumber: /^\d+$/,
  regexZip: /^\d{5}$|^\d{5}-\d{4}$/,
  regexRoutingNumber: /^\d{0,9}$/,
  regexAlphabet: /^[A-Za-z ]+$/,
  regexPrice: /^\d+(\.\d{1,2})?$/,
  WEB_CLIENT_ID: 'WEB_CLIENT_ID',

  /**
   * name
   */
  BOTTOM_TAB: 'BOTTOM_TAB',
  AUTHOR_STACK: 'AUTHOR_STACK',
  USER_STACK: 'USER_STACK',

  /**
   *Home name stack.
   */
  HOMESTACK: 'HOMESTACK',
  HOME_TITLE_TAB: 'Home',
  HOME_SCREEN: 'Home',
  NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
  NOTIFICATION_DETAIL_SCREEN: 'NOTIFICATION_DETAIL_SCREEN',
  QRCODE_SCREEN: 'QRCODE_SCREEN',

  /**
   * Search stack
   */
  SEARCH_STACK: 'SEARCH_STACK',
  SEARCH_SCREEN: 'search',
  CLASS_CATEGORY_SCREEN: 'CLASS_CATEGORY_SCREEN',
  SEARCH_CLASS_BY_CATEGORY: 'SEARCH_CLASS_BY_CATEGORY',
  SEARCH_CLASS_DETAIL: 'SEARCH_CLASS_DETAIL',
  CONTENT_CATEGORY_SCREEN: 'CONTENT_CATEGORY_SCREEN',
  CONTENT_CATEGORY_EXAM_SCREEN: 'CONTENT_CATEGORY_EXAM_SCREEN',
  SEARCH_CONTENT_BY_CATEGORY: 'SEARCH_CONTENT_BY_CATEGORY',
  SEARCH_CONTENT_BY_CATEGORY_EXAM: 'SEARCH_CONTENT_BY_CATEGORY_EXAM',
  SEARCH_CONTENT_DETAIL: 'SEARCH_CONTENT_DETAIL',
  SEARCH_EXAM_DETAIL: 'SEARCH_EXAM_DETAIL',
  CONTENT_VIEW_DETAIL: 'CONTENT_VIEW_DETAIL',
  SEARCH_TRAINING_CATEGORY_SCREEN: 'SEARCH_TRAINING_CATEGORY_SCREEN',
  SEARCH_TRAINING_BY_CATEGORY_SCREEN: 'SEARCH_TRAINING_BY_CATEGORY_SCREEN',
  SEARCH_TRAINING_DETAIL_SCREEN: 'SEARCH_TRAINING_DETAIL_SCREEN',
  SEARCH_TRAINING_DETAIL_SUBJECT_SCREEN: 'SEARCH_TRAINING_DETAIL_SUBJECT_SCREEN',
  SEARCH_CONTENT_SHARE: 'SEARCH_CONTENT_SHARE',

  /**
   * Learning stack
   */
  LEARNING_STACK: 'LEARNING_STACK',
  STUDY_SCREEN: 'STUDY_SCREEN',
  EDU_PROGRAM_DETAIL_SCREEN: 'EDU_PROGRAM_DETAIL_SCREEN',
  CLASS_DETAIL_SCREEN: 'CLASS_DETAIL_SCREEN',
  CLASS_CONTENT_VIEW_SCREEN: 'CLASS_CONTENT_VIEW_SCREEN',
  SURVEY_SCREEN: 'SURVEY_SCREEN',
  SURVEY_DETAIL_SCREEN: 'SURVEY_DETAIL_SCREEN',
  SURVEY_RESULT_SCREEN: 'SURVEY_RESULT_SCREEN',
  SURVEY_RESULT_DETAIL_SCREEN: 'SURVEY_RESULT_DETAIL_SCREEN',
  HISTORY_ACCESS_SCREEN: 'HISTORY_ACCESS_SCREEN',
  AGGREGATE_SCORE_SCREEN: 'AGGREGATE_SCORE_SCREEN',
  DETAIL_LEARNING_RESULT_SCREEN: 'DETAIL_LEARNING_RESULT_SCREEN',
  EDU_CLASS_DETAIL_SCREEN: 'EDU_CLASS_DETAIL_SCREEN',
  VIDEO_MEDIA_SCREEN: 'VIDEO_MEDIA_SCREEN',
  MY_TEST_IN_CLASS_INFORMATION_SCREEN: 'MY_TEST_IN_CLASS_INFORMATION_SCREEN',
  MY_TEST_IN_CLASS_QUESTION_SCREEN: 'MY_TEST_IN_CLASS_QUESTION_SCREEN',
  MY_TEST_RESULT_IN_CLASS_SCREEN: 'MY_TEST_RESULT_IN_CLASS_SCREEN',

  /**
   * Extend stack.
   */
  EXTEND_STACK: 'EXTEND_STACK',
  EXTEND_SCREEN: 'EXTEND_SCREEN',

  PROFILE_TITLE_TAB: 'Profile',
  PROFILE_SCREEN: 'Profile',
  PDF_SCREEN: 'Pdf',
  PROFILE_DETAIL_SCREEN: 'Profile detail',
  PROFILE_DETAIL_EDIT_SCREEN: 'Profile detail edit',
  NOTE_SCREEN: 'Note screen',
  NOTE_GENERAL_SCREEN: 'Note general screen',
  NOTE_CLASS_SCREEN: 'Note class screen',
  NOTE_DETAIL_SCREEN: 'Note detail screen',
  PROFILE_CHANGE_PASSWORD_SCREEN: 'Profile change password screen',
  PROFILE_ACCOUNT_SECURITY_SCREEN: 'Profile account security screen',
  TERM_SCREEN: 'TERM_SCREEN',
  HELP_CENTER_SCREEN: 'HELP_CENTER_SCREEN',
  FREQUENTLY_QUESTION_SCREEN: 'FREQUENTLY_QUESTION_SCREEN',
  SUPPORT_CENTER_SCREEN: 'SUPPORT_CENTER_SCREEN',
  FREQUENTLY_ASKED_QUESTIONS: 'FREQUENTLY_ASKED_QUESTIONS',
  /**
   * Test stack.
   */
  TEST_STACK: 'TEST_STACK',
  MY_TEST_SCREEN: 'MY_TEST_SCREEN',
  MY_TEST_INFORMATION_SCREEN: 'MY_TEST_INFORMATION_SCREEN',
  EXAM_INFORMATION_SCREEN: 'EXAM_INFORMATION_SCREEN',
  MY_TEST_QUESTION_SCREEN: 'MY_TEST_QUESTION_SCREEN',
  MY_TEST_RESULT_SCREEN: 'MY_TEST_RESULT_SCREEN',

  /**
   * Search stack
   */
  PROFILE_STACK: 'PROFILE_STACK',
  /**
   * name screen.
   */
  INTRODUCTION: 'INTRODUCTION',
  START: 'START_SCREEN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SIGNUP: 'SIGNUP',
  FORGET_PASSWORD_SCREEN: 'FORGET_PASSWORD_SCREEN',
  CHANGE_PASSWORD_SCREEN: 'Change Password',
  HELP_SCREEN: 'HELP_SCREEN',
  POLICY_SCREEN: 'POLICY_SCREEN',
  REGISTER: 'REGISTER_SCREEN',
  /**
   * AsyncStorage.
   */
  USER_NAME: 'USER_NAME',
  DATA_USER: 'DATA_USER',
  LANGUAGE_APP: 'LANGUAGE_APP',
  DOMAIN: 'DOMAIN',
  TAG_NAME: 'TAG_NAME',
  KEY_USER_TOKEN: 'KEY_USER_TOKEN',
  KEY_REFRESH_TOKEN: 'KEY_REFRESH_TOKEN',
  REMEMBER_ACCOUNT: 'REMEMBER_ACCOUNT',
  IS_REMEMBER: true,
  IS_NOT_REMEMBER: false,
  /**
   * Network
   */
  DATA_SUCCESS: [200, 201, '200', '201'],
  DATA_LOGOUT: [401, '401'],
  LANGUAGE_VN: 'vn',
  IS_READ: 1, // Trạng thái tin nhắn đã đọc.
  IS_FIRST: '1',
  IS_NOT_FIRST: '2',
  KEY_FIRST: 'KEY_FIRST',
  APP_COLOR: 'APP_COLOR',

  /**
   * Check type media.
   */
  MEDIA_VIDEO: ['mp4', 'mov'],
  MEDIA_AUDIO: ['mp3'],
  MEDIA_IMAGE: ['jpg', 'jpeg', 'png'],

  /**
   * Các dạng câu hỏi.
   */
  QUESTION_ONE_SELECT: 1, // Câu trả lời 1 đáp án.
  QUESTION_MULTIPLE_SELECT: 2, // Câu trả lời nhiều đáp án.
  QUESTION_FILL_BLANK: 4, // Câu trả lời điền đáp án.
  QUESTION_TF: 5, // Câu trả lời true / false.
  QUESTION_HC: 9, // Câu chả lời cha con.
  QUESTION_ESSAY: 10, // Câu trả lời tự luận.

  /**
   * Các trạng thái của bookmark.
   */
  BM_COMPLETE: 1, // Đã hoàn thành.
  BM_DO_NOT: 2, // Chưa làm.
  BM_COMPLETE_BOOKMARK: 3, // Đã làm và được đánh dấu.
  BM_DO_NOT_BOOKMARK: 4, // Chưa làm và được đánh dấu.

  /**
   * trạng thái chi tiết bài thi
   */
  TYPE_EXAM_NOTSTART: 1, // Chưa tới thời gian thi
  TYPE_EXAM_START: 2, // Vào thi
  TYPE_EXAM_CONTINUE: 3, // Câu trả lời true / false.
  TYPE_EXAM_ENDTIME: 4, // Ca thi đã kết thúc
  TYPE_EXAM_MAXCOUNT: 5, // Đã hết lượt làm bài

  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_1: 1, // Trắc nghiệm chọn một,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_2: 2, // Trắc nghiệm chọn nhiều,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_3: 3, // Kết hợp trắc nghiệm chọn một và tự luận,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_4: 4, // Kết hợp trắc nghiệm chọn nhiều và tự luận,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_5: 5, // Ma trận chọn một,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_6: 6, // Ma trận chọn nhiều,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_7: 7, // Tự luận,
  LMS_LMSSURVEYQUESTIONS_QUESTION_TYPE_8: 8, // Chọn nội dung từ hệ thống,

  MY_TEST_STATUS: {
    notStart: 1, // 1 - Chưa bắt đầu
    goingOn: 2, // 2 - Đang diễn ra
    continuteDoing: 3, // 3 - Tiếp tục làm bài
    finished: 4, // 4 - Đã kết thúc
    overLimit: 5, // 5 - Đã quá số lần được làm bài
    register: 6, // 6 - Đăng ký -
    notRegister: 7, // 7 - Không được đăng ký
  },

  IS_REQUIRED: 1, // Câu khảo sát bắt buộc trả lời,
  KEY_NETWORK: 'KEY_NETWORK',
  CONNECTED: 'CONNECTED',
  DIS_CONNECTED: 'DIS_CONNECTED',
  SHOW_QUESTION_ANSWER_RESULT: {
    showQuestionAnswer: 1, // Hiển thị câu hỏi đúng sai và phương án
    showQuestion: 2, // Hiển thị câu hỏi đúng sai
    showNotQuestion: 3, // Không hiển thị câu hỏi đúng sai
  },
  RESULT_DISPLAY_TYPE: {
    showAll: 1,
    showDetail: 2,
    showMark: 3,
    showNotMark: 4,
    showNotDetail: 5,
    showNotAll: 6,
  },
  GUIDEMPTY: '00000000-0000-0000-0000-000000000000',
  SERVICE_ACCESS_TOKEN: 'com.accessToken',
  MENU_PROFILE: {},
};

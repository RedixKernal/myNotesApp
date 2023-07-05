import OauthReducer from './OAuth/index';
import secureImgReducer from './secureImg/index';
import NotesReducer from './notes';
export const reducer = {
  Oauth: OauthReducer,
  secureImg: secureImgReducer,
  notes: NotesReducer,
};

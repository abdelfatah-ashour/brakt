// interfaces for redux

export interface CreatPostShape {
  title: string;
  category: string;
  tags: [string];
  description: string;
  content: string;
}

export interface AuthShape {
  isLogin: boolean;
  _id: string;
  username: string;
  email: string;
}



export interface ArticleShape {
  author: object;
  _id: string;
  category: string;
  comments: [];
  content: string;
  createdAt: Date;
  description: string;
  imageArticle: string;
  like: [];
  tags: string[];
  title: string;
  unlike: [];
  updatedAt: Date;
  visible: Boolean;
  __v: number;
}

export interface TagsShape {
  id: number;
  category: string;
  allTags: string[];
}

export interface UseFetchApiShape {
  loading: boolean;
  apiData: any;
  error: boolean | string;
}

interface lineHeight {
  text: string;
  value: number;
}

interface textEditorStyle {
  name: string;
  style: string;
  tag: string;
}

interface pragraphStyle {
  name: string;
  class: string;
}
interface videoRatioList {
  name: string;
  value: number;
}

export interface TextEditorShape {
  tagsBlacklist?: string;
  mode?: string;
  rtl: boolean;
  katex?: string;
  font?: [string];
  fontSize?: [number];
  formats?: [string];
  colorList?: [[string]];
  imageWidth?: string;
  imageHeight?: string;
  videoFileInput?: boolean;
  videoWidth?: string;
  videoHeight?: string;
  videoRatio?: string;
  videoRatioList?: [videoRatioList];
  audioWidth?: string;
  audioHeight?: string;
  tabDisable?: boolean;
  linkProtocol?: string;
  linkRel?: [string];
  lineHeights?: [lineHeight];
  paragraphStyles?: [string, pragraphStyle];
  textStyles?: [string, textEditorStyle];
  icons?: {
    paragraph_style: string;
  };
  buttonList?: [[string]];
}

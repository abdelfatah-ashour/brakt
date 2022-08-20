// @ts-nocheck
import React from "react";
import SunEditor from "suneditor-react";
import { contentAction } from "../../redux/actions/createPost";
import { CHANGE_CONTENT_POST } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import "suneditor/dist/css/suneditor.min.css";
import { TextEditorShape } from "../../utilities/interfaces";

export default function TextEditor(): JSX.Element {
  const { createPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  //option of sun editor text
  const option: TextEditorShape = {
    tagsBlacklist: "(h1,h2,h3,h4,h5,h6)",
    mode: "classic",
    rtl: false,
    katex: "window.katex",
    font: [
      "Arial",
      "tahoma",
      "Courier New,Courier",
      "Comic Sans MS",
      "Comic Sans MS Bold",
      "Times New Roman Bold Italic",
    ],
    fontSize: [8, 10, 12, 14, 16, 20, 24, 28, 32, 36],
    formats: ["p", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6"],
    colorList: [
      ["#ff0000", "#ff5e00", "#ffe400", "#abf200"],
      ["#00d8ff", "#0055ff", "#6600ff", "#ff00dd"],
    ],
    imageWidth: "370",
    imageHeight: "270",
    videoFileInput: false,
    videoWidth: "400",
    videoHeight: "300",
    videoRatio: "",
    videoRatioList: [
      {
        name: "Classic Film 3:2",
        value: 0.6666,
      },
      {
        name: "HD",
        value: 0.5625,
      },
    ],
    audioWidth: "300",
    audioHeight: "45",
    tabDisable: false,
    linkProtocol: "https://",
    linkRel: [
      "author",
      "external",
      "help",
      "license",
      "next",
      "follow",
      "nofollow",
      "noreferrer",
      "noopener",
      "prev",
      "search",
      "tag",
    ],
    lineHeights: [
      {
        text: "Single",
        value: 1,
      },
      {
        text: "Double",
        value: 2,
      },
    ],
    paragraphStyles: [
      "spaced",
      {
        name: "Box",
        class: "__se__customClass",
      },
    ],
    textStyles: [
      "translucent",
      {
        name: "Emphasis",
        style: "-webkit-text-emphasis: filled;",
        tag: "span",
      },
    ],
    icons: {
      paragraph_style:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
    },
    buttonList: [
      [
        "undo",
        "redo",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
        "table",
        "link",
        "image",
        "video",
        "audio",
        "imageGallery",
      ],
    ],
  };

  return (
    <SunEditor
      onChange={(e) => dispatch(contentAction(CHANGE_CONTENT_POST, e))}
      setOptions={option}
      defaultValue={createPost.createPost}
      placeholder="type content of article"
    />
  );
}

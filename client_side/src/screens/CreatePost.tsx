import React, { useState } from "react";
import Helmet from "../components/Helmet";
import { articlesLinks } from "./Home";
import SunTextEditor from "../components/SubTextEditor";
import { DefaultRootState, RootStateOrAny, useSelector } from "react-redux";
import { validateTextEditor } from "../utilities/validateTextEditor";
import { apiAxios } from "../utilities/axios";
import { notify } from "../components/Toast";
import { useHistory } from "react-router-dom";
import "../assets/css/createPost.css";
import { InputText } from "../components/inputs/InputText";
import { AuthShape } from "../utilities/interfaces";
const DataUI: {
  id: number;
  category: string;
  allTags: [string];
}[] = require("../utilities/tags_types.json");

type CreatePostState = {
  title: string;
  category: string;
  content: string;
  tags: string[] | [];
  description: string;
};

export default function CreatePost(): JSX.Element {
  const { auth } = useSelector<
    DefaultRootState,
    {
      auth: AuthShape;
    }
  >((state: RootStateOrAny) => state);
  const route = useHistory();
  const [file, setFile] = useState<any>();
  const [CreatePost, setCreatPost] = useState<CreatePostState>({
    title: "",
    category: "",
    content: "",
    tags: [],
    description: "",
  });

  // handle other input like title, description...etc
  const handleChange = (e: any) => {
    setCreatPost({
      ...CreatePost,
      [e.target.name]: e.target.value,
    });
  };

  // handle checked tags
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (CreatePost.category) {
      setCreatPost({
        ...CreatePost,
        tags: [...CreatePost.tags, e.target.value],
      });
    } else {
      setCreatPost({
        ...CreatePost,
        tags: [...CreatePost.tags, e.target.value || ""],
      });
    }
  };

  // handle select image of post
  const handleChangeFile = (e: any) => {
    setFile(e?.target?.files[0]);
  };

  const handleCreatePort = async (e: any) => {
    e.preventDefault();
    await validateTextEditor(CreatePost)
      .then(async () => {
        if (auth.isLogin) {
          let newData = new FormData();
          for (const key in CreatePost) {
            if (key === "tags") {
              newData.append(key, JSON.stringify([key]));
            }
          }
          newData.append("title", CreatePost.title);
          newData.append("category", CreatePost.category);
          newData.append("description", CreatePost.description);

          newData.append("file", file);

          await apiAxios
            .post("/v1/article/createArticle", newData)
            .then(({ data }) => {
              notify("success", data.message);
            })
            .catch((error) => {
              if (error.response) {
                notify("error", error.response.data.message);
              } else if (error.request) {
                notify("error", "invalid request");
              } else {
                notify("error", error.message);
              }
            });
        } else {
          route.push("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          notify("error", error.response.data.message);
        } else if (error.request) {
          notify("error", "valid request");
        } else {
          notify("error", error.message);
        }
      });
  };

  return (
    <Helmet
      title="Create Post"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
    >
      <main>
        <div className="container">
          <div className="d-flex flex-column mt-2 p-2 w-100">
            <h1 className="text-uppercase">🚀 Create Post</h1>
            <div className="container-create-post">
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-capitalize">
                  📢 Title
                </label>

                <InputText
                  className="form-control"
                  name="title"
                  id="title"
                  type="email"
                  placeholder="enter title"
                  value={CreatePost.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="category"
                  className="form-label text-capitalize"
                >
                  🛩 category
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="select category"
                  defaultValue={CreatePost.category}
                  name="category"
                  id="category"
                  onChange={handleChange}
                >
                  <option value="">Open this select category</option>
                  {articlesLinks.map((item, i) => {
                    return (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="d-flex flex-wrap mb-3">
                <label
                  htmlFor="tags"
                  className="form-label text-capitalize w-100 mb-3"
                >
                  🎯 Tags
                </label>
                {!CreatePost.category && (
                  <small style={{ fontSize: "12px", padding: "4px" }}>
                    please select one category
                  </small>
                )}
                {CreatePost.category &&
                  DataUI.filter(
                    (item) => item.category === CreatePost.category
                  ).map((result) => {
                    let arrOfResult: string[] = result.allTags;
                    return arrOfResult.map((tag, i): JSX.Element => {
                      return (
                        <div className="form-check w-50" key={i} id="tags">
                          <InputText
                            className="form-check-input"
                            name="tags"
                            id={String(tag)}
                            type="checkbox"
                            placeholder="enter title"
                            value={tag}
                            checked={
                              CreatePost.tags.find((key) => key === tag)
                                ? true
                                : false
                            }
                            onChange={handleChecked}
                          />

                          <label className="form-check-label" htmlFor={tag}>
                            {tag}
                          </label>
                        </div>
                      );
                    });
                  })}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="form-label text-capitalize"
                >
                  📝 description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="It's description article..."
                  name="description"
                  value={CreatePost.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3 bg-light">
                <label className="form-label text-capitalize w-100">
                  🔥 content
                </label>
                <SunTextEditor />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="imagePost"
                  className="form-label text-capitalize"
                >
                  🤳🏻 choose main image of article
                </label>

                <InputText
                  className="form-control"
                  name="tags"
                  id={"imagePost"}
                  type="file"
                  onChange={handleChangeFile}
                />
              </div>

              <div className="my-3" style={{ lineHeight: "100px" }}>
                <button
                  className="btn btn-primary text-uppercase w-100"
                  onClick={handleCreatePort}
                  style={{
                    fontWeight: 700,
                    wordSpacing: "8px",
                  }}
                >
                  create post
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Helmet>
  );
}

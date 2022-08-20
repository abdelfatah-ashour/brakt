function statePostAction(type: string, payload: any) {
  return {
    type,
    payload: {
      name: payload.name,
      value: payload.value,
    },
  };
}

function tagsAction(type: string, payload: any) {
  return {
    type,
    payload: {
      checked: payload.checked,
      name: payload.name,
      value: payload.value,
    },
  };
}

function contentAction(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

function imageAction(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

function successCreatePostAction(type: string) {
  return {
    type,
  };
}

function errorCreatePostAction(type: string) {
  return {
    type,
  };
}

export {
  statePostAction,
  tagsAction,
  contentAction,
  imageAction,
  successCreatePostAction,
  errorCreatePostAction,
};

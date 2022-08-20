function loginAction(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

function logoutAction(type: string, payload: any) {
  return {
    type,
    payload,
  };
}

export { loginAction, logoutAction };

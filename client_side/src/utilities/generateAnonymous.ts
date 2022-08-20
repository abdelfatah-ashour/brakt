type Anonymous = {
  _id: number;
  username: string;
};

function GenerateAnonymous(_id: number, username: string): Anonymous {
  return {
    _id: _id,
    username: username,
  };
}

export { GenerateAnonymous };

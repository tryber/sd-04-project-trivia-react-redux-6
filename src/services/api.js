const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON.token;
};

const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON;
};

export { getToken, getQuestions };

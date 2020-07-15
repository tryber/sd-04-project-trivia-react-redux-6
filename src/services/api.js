const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON.token;
};

const getQuestions = async (token) => {
  console.log(token)
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(URL);
  const dataJSON = await data.json();
  console.log(dataJSON)
  return dataJSON;
};

export { getToken, getQuestions };

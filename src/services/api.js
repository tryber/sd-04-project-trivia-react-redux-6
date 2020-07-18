const getToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON.token;
};

const resetToken = async (token) => {
  const URL = `https://opentdb.com/api_token.php?command=reset&token=${token}`;
  await fetch(URL);
};

const getQuestions = async (token, settings) => {
  let URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  if (settings) {
    const category = settings.categories !== 'none' ? `&category=${settings.categories}` : '';
    const difficulty = settings.difficulty !== 'none' ? `&difficulty=${settings.difficulty}` : '';
    const type = settings.type !== 'none' ? `&type=${settings.type}` : '';
    URL = `https://opentdb.com/api.php?amount=5${category}${difficulty}${type}&token=${token}`;
  }
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON;
};

const getCategory = async () => {
  const URL = 'https://opentdb.com/api_category.php';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dataJSON.trivia_categories;
};

export { getToken, getQuestions, getCategory, resetToken };

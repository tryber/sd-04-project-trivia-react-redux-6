import axios from 'axios';

const getRanking = async () => {
  const result = await axios.get('https://trivia-game-ranking.herokuapp.com');
  return result.data;
};

const addToRanking = async (name, score, picture) => {
  await axios.post('https://trivia-game-ranking.herokuapp.com', { name, score, picture });
};

export { getRanking, addToRanking };

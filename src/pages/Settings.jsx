import React, { Component } from 'react';
import { getCategory } from '../services/api';

const difficulty = ['Any Difficulty', 'easy', 'normal', 'hard'];
const type = ['Any Type', 'Multiple Choice', 'True/False'];

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategory()
      .then((res) => res.map((item) => [item.name]))
      .then((categories) => this.setState({ categories }));
  }
  render() {
    const { categories } = this.state;
    return (
      <form>
        <h1 data-testid="settings-title">Configurações</h1>
        <label htmlFor="categories">Categoria
          <select>
            {categories.map((item) => (<option key={item} value={item}>{item}</option>))}
          </select>
        </label>
        <label htmlFor="difficulty">Dificuldade
          <select>
            {difficulty.map((item) => (<option key={item} value={item}>{item}</option>))}
          </select>
        </label>
        <label htmlFor="type">Tipo
          <select>
            {type.map((item) => (<option key={item} value={item}>{item}</option>))}
          </select>
        </label>
      </form>
    );
  }
}

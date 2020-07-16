import React, { Component }  from 'react';
import { getCategory } from '../services/api';

const difficulty = ['Any Difficulty','easy', 'normal', 'hard'];
const type = ['Any Type', 'Multiple Choice', 'True/False'];

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }
  }

  componentDidMount() {
    getCategory()
      .then((res) => res.map((item) => [item.name]))
      .then((categories) => this.setState({categories}));
  }
  
  render() {
    const { categories } = this.state;
    return (
      <form className=''>
        <h1>Configurações</h1>
        <label>Categoria
          <select>
            {categories.map((item, index) =>(<option key={index} value={item}>{item}</option>))}
          </select>
        </label>
        <label>Dificuldade
          <select>
            {difficulty.map((item, index) =>(<option key={index} value={item}>{item}</option>))}
          </select>
        </label>
        <label>Tipo
          <select>
            {type.map((item, index) =>(<option key={index} value={item}>{item}</option>))}
          </select>
        </label>
      </form>
    );  
  }
}

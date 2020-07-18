import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../services/api';

const difficulty = [
  { name: 'Any Difficulty', id: 'none' },
  { name: 'Easy', id: 'easy' },
  { name: 'Medium', id: 'medium' },
  { name: 'Hard', id: 'hard' },
];
const type = [
  { name: 'Any Type', id: 'none' },
  { name: 'Multiple Choice', id: 'multiple' },
  { name: 'True/False', id: 'boolean' },
];

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      settings: {
        categories: 'none',
        difficulty: 'none',
        type: 'none',
      },
    };
  }

  componentDidMount() {
    getCategory().then((categories) => this.setState((state) => ({ ...state, categories })));
    const settingsStoraged = localStorage.getItem('settings');
    if (settingsStoraged)
      this.setState((state) => ({ ...state, settings: JSON.parse(settingsStoraged) }));
  }

  componentDidUpdate(_, prevState) {
    if (prevState.settings !== this.state.settings) {
      localStorage.setItem('settings', JSON.stringify(this.state.settings));
    }
  }

  handleChange(id, value) {
    this.setState((state) => ({ ...state, settings: { ...state.settings, [id]: value } }));
  }

  render() {
    const { categories, settings } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col">
            <div className="card">
              <div className="container">
                <div className="row mb-5 align-items-center justify-content-center">
                  <div className="col-6">
                    <h1 data-testid="settings-title" className="text-center my-5">
                      Configurações
                    </h1>
                    <form>
                      <div className="row justify-content-center">
                        <div className="form-group w-100">
                          <label htmlFor="categories" className="w-100">
                            Categoria
                            <select
                              onChange={(e) => this.handleChange('categories', e.target.value)}
                              value={settings.categories}
                              className="form-control"
                            >
                              <option value={'none'}>Any Category</option>
                              {categories.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="form-group w-100">
                          <label htmlFor="difficulty" className="w-100">
                            Dificuldade
                            <select
                              onChange={(e) => this.handleChange('difficulty', e.target.value)}
                              value={settings.difficulty}
                              className="form-control"
                            >
                              {difficulty.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        <div className="form-group w-100">
                          <label htmlFor="type" className="w-100">
                            Tipo
                            <select
                              onChange={(e) => this.handleChange('type', e.target.value)}
                              value={settings.type}
                              className="form-control"
                            >
                              {type.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <Link to="/" className="btn btn-primary">
                          Voltar
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

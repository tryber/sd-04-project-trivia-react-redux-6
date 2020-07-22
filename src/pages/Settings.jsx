import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategory } from '../services/api';
import {
  selectCategory,
  selectDifficulty,
  selectType,
} from '../actions/settings';

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

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategory().then((categories) =>
      this.setState((state) => ({ ...state, categories })),
    );
  }

  handleChangeCategory(value) {
    const { selectedCategory } = this.props;
    selectedCategory(value);
  }

  handleChangeDifficulty(value) {
    const { selectedDifficulty } = this.props;
    selectedDifficulty(value);
  }

  handleChangeType(value) {
    const { selectedType } = this.props;
    selectedType(value);
  }

  render() {
    const { categories } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col">
            <div className="card">
              <div className="container">
                <div className="row mb-5 align-items-center justify-content-center">
                  <div className="col-6">
                    <h1
                      data-testid="settings-title"
                      className="text-center my-5"
                    >
                      Configurações
                    </h1>
                    <form>
                      <div className="row justify-content-center">
                        <div className="form-group w-100">
                          <label htmlFor="categories" className="w-100">
                            Categoria
                            <select
                              onChange={(e) =>
                                this.handleChangeCategory(e.target.value)
                              }
                              value={this.props.categories}
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
                              onChange={(e) =>
                                this.handleChangeDifficulty(e.target.value)
                              }
                              value={this.props.difficulty}
                              className="form-control"
                            >
                              {difficulty.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                              settingsReducer
                            </select>
                          </label>
                        </div>
                        <div className="form-group w-100">
                          <label htmlFor="type" className="w-100">
                            Tipo
                            <select
                              onChange={(e) =>
                                this.handleChangeType(e.target.value)
                              }
                              value={this.props.type}
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

Settings.propTypes = {
  selectedCategory: PropTypes.arrayOf(
    PropTypes.object,
  ),
  selectedDifficulty: PropTypes.arrayOf(
    PropTypes.object,
  ),
  selectedType: PropTypes.arrayOf(
    PropTypes.object,
  ),
  categories: PropTypes.arrayOf(
    PropTypes.object,
  ),
  difficulty: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string
    }),
  ),
  type: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string
    }),
  ),
};

const mapStateToProps = (state) => ({
    categories: state.settingsReducer.categories,
    difficulty: state.settingsReducer.difficulty,
    type: state.settingsReducer.type,
});

const mapDispatchToProps = (dispatch) => ({
  selectedCategory: (value) => dispatch(selectCategory(value)),
  selectedDifficulty: (value) => dispatch(selectDifficulty(value)),
  selectedType: (value) => dispatch(selectType(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

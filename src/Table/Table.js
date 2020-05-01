import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class Table extends Component {
  state = {
    rows: [],
  };

  formatters = [
    '',
    'email',
    'image',
    'link',
    'imageLink',
    'humanTime',
    'status',
    'boolean',
    'number',
    'translator',
    'multiLingual',
  ];

  constructor(props) {
    super(props);
    this.newRow({
      head: "#",
      key: "id"
    });

    this.newRow({
      head: "name",
      key: "name",
    });

    this.newRow({
      head: "image",
      key: "image",
      formatter: 'image',
    });

    this.newRow({
      head: "status",
      key: "status",
      formatter: 'status',
    });    
  }

  newRow(options) {
    options = Object.assign(this.defaultOptions(), options);
    this.state.rows.push(options);
  }

  addNewRow(options) {
    this.state.rows.push(options);

    this.setState(this.state);
  }

  removeRow(index) {
    this.unset('rows', index);

    this.reRender();
  }

  unset(stateArrayKey, index) {
    let array = this.state[stateArrayKey];

    this.setState({
      [stateArrayKey]: array.splice(index, 1),
    });
  }

  reRender() {
    this.setState({
      rows: [...this.state.rows],
    });
  }

  onInputChange = (name, index, newValue) => {
    let option = this.state.rows[index];
    option[name] = newValue;

    this.reRender();
  }

  tableOptionColumn(name, value, index) {
    let inputName = `tableOptions[columns][${index}][${name}]`;

    return <td>
      <input type="text"
        onChange={e => { this.onInputChange(name, index, e.target.value) }}
        required={!['tooltip', 'default'].includes(name)}
        className="form-control"
        placeholder={name}
        value={value}
        name={inputName} />
    </td>;
  }

  formatterOption(value, index) {
    let formatOptions = this.formatters.map((format, index) => {
      return <option key={index} value={format}>{format}</option>
    });

    let inputName = `tableOptions[columns][${index}][formatter]`;

    return <td>
      <select name={inputName} defaultValue={value} className="form-control">
        {formatOptions}
      </select>
    </td>;
  }

  defaultOptions() {
    return {
      head: '',
      key: '',
      formatter: '',
      value: '',
      tooltip: '',
      default: '',
    };
  }

  renderRows() {
    return this.state.rows.map((option, index) => {
      return <tr key={index}>
        {this.tableOptionColumn('head', option.head, index)}
        {this.tableOptionColumn('key', option.key, index)}
        {this.formatterOption(option.formatter, index)}
        {this.tableOptionColumn('default', option.default, index)}
        {this.tableOptionColumn('tooltip', option.tooltip, index)}

        <td>
          <button type="button" className="btn btn-sm btn-danger" onClick={this.removeRow.bind(this, index)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      </tr>;
    });
  }

  render() {
    return (
      <div>
        <h2>Table Options</h2>
        <table className="table table-bordered" id="table-options-list">
          <thead>
            <tr>
              <th>Heading Column</th>
              <th>Response Key</th>
              <th>Response Value Formatter</th>
              <th>Default Value</th>
              <th>Tooltip</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6">
                <button type="button"
                  onClick={this.addNewRow.bind(this, this.defaultOptions())}
                  className="btn btn-sm btn-info">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

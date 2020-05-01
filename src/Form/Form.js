import './form.scss';
import React, { Component } from 'react';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Form extends Component {
  state = {
    rows: [],
    withStatus: true,
  };

  addType = (rowIndex, type) => {
    let row = this.state.rows[rowIndex];
    row.push(this.defaultInputValues({ type }));

    this.reRender();
  };

  defaultInputValues(overrideBy = {}) {
    return Object.assign({
      type: '',
      col: 'col',
      name: '',
      value: '',
      label: '',
      placeholder: '',
      confirmName: '',
      itemKey: '',
      service: '',
      slug: false,
      required: false,
      multiLingual: false,
      imageable: false,
      lazyLoading: false,
      remoteSearch: false,
      none: false,
    }, overrideBy);
  }

  inputsTypes = [
    {
      type: 'text',
      color: 'purple',
      onClick: this.addType,
    },
    {
      type: 'textarea',
      color: 'brown',
      onClick: this.addType,
    },
    {
      type: 'email',
      color: 'orange',
      onClick: this.addType,
    },
    {
      type: 'image',
      color: 'pink',
      onClick: this.addType,
    },
    {
      type: 'password',
      color: 'teal',
      onClick: this.addType,
    },
    {
      type: 'number',
      color: 'blue',
      onClick: this.addType,
    },
    {
      type: 'datepicker',
      color: 'grey',
      onClick: this.addType,
    },
    {
      type: 'checkbox',
      color: 'indigo',
      onClick: this.addType,
    },
    {
      type: 'dropdown',
      color: 'lime',
      onClick: this.addType,
    },
  ];

  Inputs = (index) => {
    return this.inputsTypes.map((input, i) => {
      return <button
        key={i}
        type="button"
        className={'add-type-btn btn btn-sm btn-' + input.color}
        onClick={input.onClick.bind(this, index, input.type)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1" />
        {input.type} Input
          </button>
    });
  };

  constructor(props) {
    super(props);
    this.addDefaultRow();
  }

  addDefaultRow() {
    this.state.rows.push([
      this.defaultInputValues({
        type: 'text',
        name: 'name',
        label: 'name',
        placeholder: 'name',
        value: 'name',
        slug: false,
        required: true,
      }),
    ]);

    this.state.rows.push([
      this.defaultInputValues({
        type: 'image',
        name: 'image',
        label: 'image',
        value: 'image',
        required: true,
      }),
    ]);
  }

  reRender() {
    this.setState({
      rows: [...this.state.rows],
    });
  }
  addNewRow() {
    this.state.rows.push([]);

    this.setState(this.state);
  }

  updateValue(input, key, e, booleanInput = false) {
    if (booleanInput === false) {
      input[key] = e.target.value;

      if (key === 'label' && typeof input.placeholder !== 'undefined' && !input.manualPlaceHolderUpdate) {
        input.placeholder = e.target.value;
      }

      if (key === 'placeholder') {
        input.manualPlaceHolderUpdate = true;
      }

      if (key === 'name' && !input.manualValueUpdate) {
        input.value = e.target.value;
      }

      if (key === 'value') {
        input.manualValueUpdate = true;
      }

    } else {
      input[key] = e.target.checked;
    }

    this.reRender();
  }

  removeInput(rowIndex, inputIndex) {
    this.state.rows[rowIndex].splice(inputIndex, 1);
    this.reRender();
  }

  removeRow(rowIndex) {
    this.state.rows.splice(rowIndex, 1);
    this.reRender();
  }

  checkboxInput(inputName, inputOptions, nameCreator, label = inputName) {
    let name = nameCreator(inputName),
      id = name.replace(/[[|]]*/g, '');
    return <div className="form-group">
      <label htmlFor={id}>
        {label} Input
    </label>
      <input type="checkbox"
        name={name}
        id={id}
        value={1}
        checked={inputOptions[inputName]}
        onChange={e => { this.updateValue(inputOptions, inputName, e, true) }}
        className="ml-2"
      />
    </div>
  }

  renderTextInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="placeholder"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.checkboxInput('multiLingual', inputOptions, nameCreator)}
      {inputOptions.type == 'text' && this.checkboxInput('slug', inputOptions, nameCreator)}

      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderImageInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />

      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />

      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('multiLingual', inputOptions, nameCreator)}
      {this.checkboxInput('required', inputOptions, nameCreator)}

      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderNumberInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="placeholder"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}

      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderInputOptions(nameCreator, inputOptions) {
    let colsList = (new Array(...Array(13))).map((v, index) => {
      let value, text;
      if (index == 0) {
        value = 'col';
        text = 'Auto Fill';
      } else {
        text = `col-${index + 1}`;
        value = `col-sm-${index + 1}`;
      }

      return <option key={index} value={value}>{text}</option>
    });

    return <>
      <select className="form-control mb-2" name={nameCreator('col')} onChange={e => { this.updateValue(inputOptions, 'col', e) }} value={inputOptions.col}>
        {colsList}
      </select>
      <input type="text"
        name={nameCreator('type')}
        placeholder={inputOptions.type + ' Type'}
        value={inputOptions.type}
        readOnly={true}
        className="form-control mb-2"
      />
    </>;
  }

  renderDatepickerInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="placeholder"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderCheckboxInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderEmailInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="placeholder"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderPasswordInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('confirmName')}
        placeholder="Confirm Password Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'confirmName', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />
      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="placeholder"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderDropdownInput(inputOptions, nameCreator) {
    return <>
      <input type="text"
        name={nameCreator('name')}
        placeholder="Name"
        value={inputOptions.name}
        onChange={e => { this.updateValue(inputOptions, 'name', e) }}
        className="form-control mb-2"
      />

      <input type="text"
        name={nameCreator('value')}
        placeholder="Value Key"
        value={inputOptions.value}
        onChange={e => { this.updateValue(inputOptions, 'value', e) }}
        className="form-control mb-2"
      />

      <input type="text"
        name={nameCreator('label')}
        placeholder="Label"
        value={inputOptions.label}
        onChange={e => { this.updateValue(inputOptions, 'label', e) }}
        className="form-control mb-2"
      />

      <input type="text"
        name={nameCreator('placeholder')}
        placeholder="Heading"
        value={inputOptions.placeholder}
        onChange={e => { this.updateValue(inputOptions, 'placeholder', e) }}
        className="form-control mb-2"
      />

      {!inputOptions.lazyLoading && <>
        <input type="text"
          name={nameCreator('items')}
          placeholder="itemsKey (i.e `this.languages` or `['enabled', 'disabled']`), (Can not be used along with lazyLoading inputs)"
          value={inputOptions.items}
          onChange={e => { this.updateValue(inputOptions, 'items', e) }}
          className="form-control mb-2"
        />
      </>}

      {this.checkboxInput('required', inputOptions, nameCreator)}
      {this.checkboxInput('imageable', inputOptions, nameCreator)}
      {this.checkboxInput('none', inputOptions, nameCreator)}

      {this.checkboxInput('lazyLoading', inputOptions, nameCreator)}

      {inputOptions.lazyLoading && <>
        <input type="text"
          name={nameCreator('service')}
          placeholder="Service Name"
          value={inputOptions.service}
          onChange={e => { this.updateValue(inputOptions, 'service', e) }}
          className="form-control mb-2"
        />

        {this.checkboxInput('remoteSearch', inputOptions, nameCreator)}

      </>}

      {this.renderInputOptions(nameCreator, inputOptions)}
    </>;
  }

  renderInput(inputOptions, rowIndex, inputIndex) {
    let name = type => `formOptions[rows][${rowIndex}][${inputIndex}][${type}]`;
    let inputRendererType;

    switch (inputOptions.type) {
      case 'text':
      case 'textarea':
        inputRendererType = this.renderTextInput;
        break;
      case 'image':
        inputRendererType = this.renderImageInput;
        break;

      case 'email':
        inputRendererType = this.renderEmailInput;
        break;

      case 'number':
        inputRendererType = this.renderNumberInput;
        break;

      case 'datepicker':
        inputRendererType = this.renderDatepickerInput;
        break;

      case 'checkbox':
        inputRendererType = this.renderCheckboxInput;
        break;

      case 'dropdown':
        inputRendererType = this.renderDropdownInput;
        break;

      case 'password':
        inputRendererType = this.renderPasswordInput;
        break;

      default:
        break;
    }

    return <>
      <button type="button" className="btn btn-sm btn-danger btn-circle " onClick={this.removeInput.bind(this, rowIndex, inputIndex)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {inputRendererType.call(this, inputOptions, name)}
    </>;
  }

  renderRow(row, index) {
    return row.map((input, i) => {
      return <div key={i} className={input.col}>
        {this.renderInput.call(this, input, index, i)}
      </div>
    });
  }

  renderRows() {
    return this.state.rows.map((row, index) => {
      return <div className="row form-row" key={index}>
        <div className="col-12 text-right">
          <button type="button" className="btn btn-sm btn-danger btn-circle " onClick={this.removeRow.bind(this, index)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {this.renderRow(row, index)}
        <div className="col-12">
          {this.Inputs(index)}
        </div>
      </div>
    });
  }

  render() {
    return (
      <div>
        <h2>Form Options</h2>
        {this.renderRows()}

        <button
          type="button"
          className={'add-row-btn btn btn-sm btn-info'}
          onClick={this.addNewRow.bind(this)}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-1" />
          Row
          </button>

        <div className="form-group">
          <label htmlFor="status">Add Status Dropdown</label>
          <input type="checkbox" id="status" className="ml-2" name="formOptions[withStatus]" checked={this.state.withStatus} onChange={e => this.setState({withStatus: e.checked})} value="1" />
        </div>
      </div>
    )
  }
}

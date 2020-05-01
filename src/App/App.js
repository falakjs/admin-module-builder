import React, { Component } from 'react'
import './App.scss';
import Table from '../Table/Table'
import Form from '../Form/Form'
import axios from 'axios';

const url = 'http://localhost:8881/create-module';
const settingsUrl = 'http://localhost:8881/settings';

export default class App extends Component {
  state = {
    sent: false,
    apps: [],
    currentApp: '',
  };

  constructor(props) {
    super(props);

    axios.get(settingsUrl).then(({data}) => {
      let {apps} = data;

      let appsList = Object.keys(apps);

      if (! appsList.includes('common')) {
        appsList.push('common');
      }

      this.setState({
        apps: appsList,
        currentApp: data.baseApp,
      });
    });
  }

  appsList() {
    return this.state.apps.map(app => {
      return (
      <option value={app} key={app}>{app}</option>
      );
    });
  }

  createModule(e) {
    e.preventDefault();
    axios.post(url, new FormData(e.target));

    this.setState({
      sent: true,
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.sent && <>
          <h1 className="font-weight-bold text-center green-text">Admin Module Has Been Created Successfully</h1>
        </>}
        {!this.state.sent &&
          <form onSubmit={this.createModule.bind(this)}>
            <h1 className="text-center">Admin Module Builder</h1>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="module">Module</label>
                  <input type="text" required name="module" placeholder="Module" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="route">Route</label>
                  <input type="text" required name="route" placeholder="Route" className="form-control" />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="app">Application</label>
                  <select name="app" onChange={e => this.setState({currentApp: e.target.value})} value={this.state.currentApp} className="form-control">
                    {this.appsList()}
                  </select>
                </div>
              </div>
            </div>
            <Table />
            <Form />
            <button className="btn btn-success font-weight-bold">Create</button>
          </form>}
      </div>
    )
  }
}

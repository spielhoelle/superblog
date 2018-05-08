import React from 'react';
import axios from 'axios';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(nextProps, prevState){
    console.log(nextProps, prevState);

  }
    render() {
      return (
        <form name="submitform" className="card-content" onSubmit={this.props.handleSubmit}>
          <div>
            <h4>Create a post:</h4>
            <div className="form-group">
              <input className="btn green accent-2" type="submit" value="Submit"/>
            </div>
          </div>
          <div className="form-group">
            <label className="w-100">
              Name:
              <input className="form-control" id="name" onChange={this.props.handleChange} />
            </label>
          </div>
          <div className="form-group">
            <label className="w-100">
              Content:
              <textarea id="content" className="materialize-textarea" onChange={this.props.handleChange} />
            </label>
          </div>
        </form>
    )
  }
};

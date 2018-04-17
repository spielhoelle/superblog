import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      form: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount() {
    fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
      this.setState({posts: posts});
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.elements);
    let form = this.state.form
    axios.post('http://localhost:5000/api/posts', form).then(response => {
      console.log("Slide added successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts: posts});
      });
    }).catch(function(error) {
      console.log("Error: ", error);
    })
  }
  handleChange(e) {
    let form = { ...this.state.form };
    if (e.target.value !== "") {
      form[e.target.id] = e.target.value
    }
    this.setState({form: form});
  }
  handleDelete(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(response => {
      console.log("Slide added successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts: posts});
      });
    }).catch(function(error) {
      console.log("Error: ", error);
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="my-3">
              <h2>Create a post:</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="w-100">
                    Name:
                    <input className="form-control" id="name" onChange={this.handleChange}/>
                  </label>
                </div>
                <div className="form-group">
                  <label className="w-100">
                    Content:
                    <textarea id="content" className="form-control" onChange={this.handleChange}/>
                  </label>
                </div>
                <div className="form-group">
                  <input className="btn btn-primary" type="submit" value="Submit"/>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <div className="my-3">
              <h2>List of all posts:</h2>
              <ul className="list-group">
                {
                  this.state.posts.map(post => (<li className="list-group-item">
                    <h2>{post.name}</h2>
                    <p>{post.content}</p>
                    <button className="btn btn-danger" onClick={() => this.handleDelete(post._id)}>Remove</button>
                  </li>))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

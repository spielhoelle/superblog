import React from 'react';
import axios from 'axios';

const styles = {
  flexed: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nomargin: {
    margin: 0
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.state = {
      posts: [],
      form: {},
      search: "",
      editing: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUnedit = this.handleUnedit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentDidMount() {
    fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
      this.setState({posts});
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let form = this.state.form
    // Thanx to @PatrickS83 we could get rid of axios and make a native fetch
    fetch("http://localhost:5000/api/posts", {
         method: "POST",
         body: JSON.stringify(form),
         headers: {
           "content-type": "application/json"
         }
       }).then(response => response.json())
       .then(response => {
         M.toast({html: `Post ${form.name} created!`})
         let posts = [...this.state.posts]
         posts.push(response.post)
         this.setState({posts});
       });

  }
  handleChange(e) {
    let form = { ...this.state.form };
    if (e.target.value !== "") {
      form[e.target.id] = e.target.value
    }
    this.setState({form: form});
  }

  handleSearch = (e) => {
    this.setState({search: this.searchRef.current.value});
  }

  handleDelete(id) {
    console.log(id);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(response => {
      console.log("Slide deleted successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts});
        M.toast({html: 'Post deleted!'})
      });
    }).catch(function(error) {
      console.log("Error: ", error);
    })
  }

  handleUpdate(event, post){
    event.preventDefault()
    axios.put(`http://localhost:5000/api/posts/${post._id}`, this.state.form).then(response => {
      console.log("Slide edited successful: ", response);
      fetch(`http://localhost:5000/api/posts`).then(resp => resp.json()).then(posts => {
        this.setState({posts, editing: null});
        M.toast({html: 'Post updated successfully!'})

      });
    }).catch(function(error) {
      console.log("Error: ", error);
    })

  }
  handleEdit(post) {
    this.setState({
      form: post,
      editing: post
    })
  }
  handleUnedit(e) {
    // if i click a button i dont want to toggle the edit mode
    // if(!e.target.classList.value.includes("material-icons")) {
        this.setState({
        editing: null
      })
    // }
  }
  render() {
    const posts = this.state.search !== "" ? this.state.posts.filter(p => p.name.toLowerCase().includes(this.state.search.toLowerCase())) : this.state.posts
    const posttemplate =
              (<ul className="collection">
                {posts.map(post => (
                        this.state.editing && this.state.editing._id === post._id ? (
                         <li className="black-text collection-item">
                          <form  onSubmit={(event) => this.handleUpdate(event, post)}>
                              <label className="w-100">
                                Name:
                                <input className="form-control" defaultValue={this.state.editing.name} id="name" onChange={this.handleChange}/>
                              </label>
                              <label className="w-100">
                                Content:
                                <textarea id="content" className="materialize-textarea" defaultValue={this.state.editing.content} onChange={this.handleChange}/>
                              </label>
                            <div style={styles.flexed} className="">
                              <a href="#!" className="" onClick={(e) => this.handleUnedit(e)}>cancel</a>
                              <input className="btn green accent-2" type="submit" value="Submit"/>
                            </div>
                          </form>
                          </li>
                      ) : (
                         <li className="black-text collection-item avatar">
                          <i className="material-icons circle">folder</i>
                          <span className="title">{ post.name}</span>
                          <p>{post.content}</p>
                          <div className="secondary-content">
                            <a href="#!" className="" onClick={() => this.handleEdit(post)}><i className="material-icons teal-text">edit</i></a>
                            <a href="#!" className="" onClick={() => this.handleDelete(post._id)}><i className="material-icons red-text">remove</i></a>
                          </div>
                        </li>
                    )
                  ))
                }
                </ul>)

    return (
      <div className="container" >
        <div className="row">
          <div className="col-md-4">
            <div className="my-3 card">
              <form className="card-content" onSubmit={this.handleSubmit}>
                <div style={styles.flexed}>
                  <h4 style={styles.nomargin}>Create a post:</h4>
                  <div className="form-group">
                    <input className="btn green accent-2" type="submit" value="Submit"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="w-100">
                    Name:
                    <input className="form-control" id="name" onChange={this.handleChange}/>
                  </label>
                </div>
                <div className="form-group">
                  <label className="w-100">
                    Content:
                    <textarea id="content" className="materialize-textarea" onChange={this.handleChange}/>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-8">
            <div className="my-3 card">
              <div className="card-content">
              <h4 style={styles.nomargin}>List of all posts:</h4>
              </div>
              <nav className="green accent-2">
                <div className="nav-wrapper">
                  <form>
                    <div className="input-field">
                      <input onChange={(e) => this.handleSearch(e)} ref={this.searchRef} id="search" placeholder="search postname" type="search" required/>
                      <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                      <i className="material-icons">close</i>
                    </div>
                  </form>
                </div>
              </nav>
              {posttemplate }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

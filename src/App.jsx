import React from 'react';
import axios from 'axios';
import Post from './Post.jsx';
import SearchBar from './SearchBar.jsx';
import CreatePost from './CreatePost.jsx';

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
    let form = {...this.state.form}
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
         document.forms["submitform"].reset()
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
  handleEdit = (post) => {
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
                  <Post
                    editing={this.state.editing}
                    handleUpdate={this.handleUpdate}
                    handleUnedit={this.handleUnedit}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    handleChange={this.handleChange}
                    post={post}
                  />
                  ))
                }
                </ul>)

    return (
      <div className="container" >
        <div className="row">
          <div className="col-md-4">
            <div className="my-3 card">
              <CreatePost
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                form={this.state.form}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="my-3 card">
              <div className="card-content">
              <h4 style={styles.nomargin}>List of all posts:</h4>
              </div>
              <SearchBar/>
              {posts.length > 0 ? posttemplate : <div className="card-content">Nothing found</div> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

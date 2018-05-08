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
export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
      return (
        this.props.editing && this.props.editing._id === this.props.post._id ? (
         <li className="black-text collection-item">
          <form  onSubmit={(event) => this.props.handleUpdate(event, this.props.post)}>
              <label className="w-100">
                Name:
                <input className="form-control" defaultValue={this.props.editing.name} id="name" onChange={this.props.handleChange}/>
              </label>
              <label className="w-100">
                Content:
                <textarea id="content" className="materialize-textarea" defaultValue={this.props.editing.content} onChange={this.props.handleChange}/>
              </label>
            <div style={styles.flexed} className="">
              <a href="#!" className="" onClick={(e) => this.props.handleUnedit(e)}>cancel</a>
              <input className="btn green accent-2" type="submit" value="Submit"/>
            </div>
          </form>
          </li>
      ) : (
         <li className="black-text collection-item avatar">
          <i className="material-icons circle">folder</i>
          <span className="title">{ this.props.post.name}</span>
          <p>{this.props.post.content}</p>
          <div className="secondary-content">
            <a href="#!" className="" onClick={() => this.props.handleEdit(this.props.post)}><i className="material-icons teal-text">edit</i></a>
            <a href="#!" className="" onClick={() => this.props.handleDelete(this.props.post._id)}><i className="material-icons red-text">remove</i></a>
          </div>
        </li>
    )
  )
  }
};

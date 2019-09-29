import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'

class CommentList extends Component{
  static propTypes={
    comments:PropTypes.array,
    onDeleteComment:PropTypes.func
  }
  static defaultProps={
    comments:[]
  }
  render(){
    return (
      <div>
        {this.props.comments.map((comment,i)=>
          <Comment 
            key={i}
            comment={comment}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)}
          />
        )}
      </div>
    )
  }
  handleDeleteComment(index){
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(index)
    }
  }
  componentDidMount(){
    console.log(this.props.comments)
  }
}

export default CommentList
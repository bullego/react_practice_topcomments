import React from 'react';
import Post from './Post';
import PostsControls from './PostsControls';
import './App.css';

export class App extends React.Component {
  state = {
    posts: [],
    isLoading: false,
    activeAutoRefreshBtn: false,
    minPostComments: 0
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    this.setState({
      isLoading: true
    })
    fetch('https://www.reddit.com/r/reactjs.json?limit=100')
      .then(response => response.json())
      .then(({ data }) => {
        this.setState({
          posts: data.children,
          isLoading: false
        })
      })
      .catch(err => alert(err))
  }

  updateAutoRefresh = () => {
    this.setState(
      (state) => ({activeAutoRefreshBtn: !state.activeAutoRefreshBtn}),
      () => {
        if(this.state.activeAutoRefreshBtn) {
          this.refreshPosts = setInterval(this.getPosts, 3000);
        } else {
          clearInterval(this.refreshPosts);
        }
      }
    )
  }

  setMinPostComments = (e) => {
    this.setState({
      minPostComments: Number(e.target.value)
    })
  }
  
  getPostsByComments = (posts, minPostComments) => {
    return posts.filter(post => post.data.num_comments >= minPostComments)
                .sort((a,b) => b.data.num_comments - a.data.num_comments)
  }

  render() {
    const {posts, isLoading, activeAutoRefreshBtn, minPostComments} = this.state;
    const sortPostsByComments = this.getPostsByComments(posts, minPostComments);

    return (
      <div className='app_wrap'>
        <h1 className='app_title'>Top commented</h1>
        
        <PostsControls updateAutoRefresh={this.updateAutoRefresh}
                       activeAutoRefreshBtn={activeAutoRefreshBtn}
                       minPostComments={minPostComments}
                       setMinPostComments={this.setMinPostComments}/>
        
        {isLoading 
          ? <p>...Loading</p> 
          : 
            sortPostsByComments.length > 0
              ?
                <ul className='gallery_items'>
                  { sortPostsByComments.map(post => {
                      return (
                        <li key={post.data.id}
                            className='gallery_item'>
                          <Post data={post.data} />
                        </li>
                      )
                    })}
                </ul>
              :
                <p className='gallery_message'>No results found matching your criteria</p>
        }
      </div>
    )
  }
}
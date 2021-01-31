import React from 'react';
import stl from './PostsControls.module.css';

const PostsControls = ({updateAutoRefresh,
			activeAutoRefreshBtn,
			minPostComments,
			setMinPostComments}) => {
	return (
		<div className={stl.posts_controls}>
			<button className={stl.autorefresh_btn}
				onClick={updateAutoRefresh}
              			type='button'>
				{ activeAutoRefreshBtn ? 'Stop' : 'Start' } auto refresh
			</button>

			<div className={stl.autorefresh_slide_wrap}>
				<input className={stl.autorefresh_slide}
				       type='range'
				       min={0}
				       max={350}
				       step={5}
				       defaultValue={minPostComments}
				       onChange={setMinPostComments}/> 
				
				<p className={stl.autorefresh_post_count}>current filter: {minPostComments}</p>
			</div>
		</div>
	)
}

export default PostsControls;

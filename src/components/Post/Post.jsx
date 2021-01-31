import React, {memo} from 'react';
import stl from './Post.module.css';
import defaultImg from '../../assets/default_img.png';

const Post = memo(({data}) => {
	return (
		<div className={stl.gallery_card_wrap}>
			{ data.thumbnail.includes('b.thumbs.redditmedia.com')
				? <img src={data.thumbnail}
				       className={stl.card_img}
				       alt='gallery'/>
				: <img src={defaultImg}
				       className={stl.card_img}
				       alt='gallery'/>
			}
			<h3 className={stl.card_title}>{data.title}</h3>
			<span className={stl.card_number}>Number of comments: {data.num_comments}</span>
			<a href={`https://www.reddit.com${data.permalink}`}
			   className={stl.card_link}
			   target='_blank'
			   rel="noreferrer">
				show more...
			</a>
		</div>	
	)
});

export default Post;

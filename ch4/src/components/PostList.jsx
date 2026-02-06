import React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Post } from './Post'

export const PostList = ({ posts = [], onEdit, setView, setTags }) => {
  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post
            post={post}
            onEdit={onEdit}
            setView={setView}
            setTags={setTags}
          />
        </Fragment>
      ))}
    </div>
  )
}
PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}

import React, { useEffect } from "react";
import { useAppContext, getSortedArray } from "../context/provider";
import CardBox from "../components/CardBox";
import "../App.css";
function Posts() {
  const { state, dispatch, getPosts } = useAppContext();

  return (
    <div className='Posts'>
      {getSortedArray(state.posts).map((item, index) => (
        <div>
          <CardBox post={item} />
        </div>
      ))}
    </div>
  );
}

export default Posts;

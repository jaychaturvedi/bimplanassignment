import React, { useState, createContext, useContext, useEffect } from "react";
import { adminApi, resolveRequest } from "../config/index";
import ShowNotification from "../config/notification";

export const AppContext = createContext<any>({});
export const getSortedArray = (arr) => {
  const sortedArr = arr.sort(function (a, b) {
    var keyA = new Date(a.updatedAt),
      keyB = new Date(b.updatedAt);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  console.log(sortedArr);
  return sortedArr;
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "add_posts":
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case "store_posts":
      return {
        ...state,
        posts: payload,
      };
    case "update_posts":
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.id === payload.id) return payload;
          return item;
        }),
      };

    default:
      return state;
  }
};
// {
//   "id": 1,
//   "title": "new post updated",
//   "description": "description",
//   "status": true,
//   "createdAt": "2021-05-20T06:54:07.946Z",
//   "updatedAt": "2021-05-20T16:16:52.804Z"
// }
export const AppProvider = (props) => {
  const [state, setState] = useState({
    posts: [],
  });
  const dispatch = (action) => {
    const newState = reducer(state, action);
    setState(newState);
  };
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const promise = adminApi.get();
    const response = await resolveRequest(promise);
    if (response.status === "OK") {
      // ShowNotification("success", response.message);
      dispatch({ type: "store_posts", payload: response.body });
    } else if (response.error) {
      ShowNotification("error", "Failed to fetch api");
    }
    console.log(response);
    return response.body;
  };
  const createPost = async (body) => {
    const promise = adminApi.create(body);
    const response = await resolveRequest(promise);
    if (response.status === "OK") {
      // ShowNotification("success", response.message);
      dispatch({ type: "add_posts", payload: response.body });
      ShowNotification("success", response.message);
    } else if (response.error) {
      ShowNotification("error", "Failed to create");
    }
    console.log(response);
    return response.body;
  };
  const updatePost = async (id, body) => {
    const promise = adminApi.update(id, body);
    const response = await resolveRequest(promise);
    if (response.status === "OK") {
      // ShowNotification("success", response.message);
      dispatch({ type: "update_posts", payload: response.body });
      ShowNotification("success", response.message);
    } else if (response.error) {
      ShowNotification("error", "Failed to create");
    }
    console.log(response);
    return response.body;
  };

  const deletePost = async (id) => {
    const promise = adminApi.delete(id);
    const response = await resolveRequest(promise);
    if (response.status === "OK") {
      const remainingPosts = state.posts.filter((item) => {
        if (item.id !== id) return item;
      });
      console.log("remaining posts", remainingPosts);
      // ShowNotification("success", response.message);
      dispatch({ type: "store_posts", payload: remainingPosts });
      ShowNotification("success", response.message);
    } else if (response.error) {
      ShowNotification("error", "Failed to delete");
    }
    console.log(response);
    return response.body;
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        getPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);

export default AppProvider;

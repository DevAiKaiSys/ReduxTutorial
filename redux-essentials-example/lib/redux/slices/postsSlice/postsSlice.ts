import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { RootState } from "../../store";

const initialState: PostSliceState[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: "0",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    user: "2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof PostReactions }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.find((post) => post.id === postId);

/* Types */
export type PostSliceState = Post;

export type Post = {
  id: string;
  title: string;
  content: string;
  user?: string;
  date?: string;
  reactions: PostReactions;
};

export type PostReactions = {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

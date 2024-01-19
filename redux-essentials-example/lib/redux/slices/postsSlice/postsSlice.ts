import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { client } from "@/app/api/client";

// const initialState: PostSliceState[] = [
//   {
//     id: "1",
//     title: "First Post!",
//     content: "Hello!",
//     user: "0",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Second Post",
//     content: "More text",
//     user: "2",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ];
// const initialState: PostSliceState = {
//   posts: [],
//   status: "idle",
//   error: null,
// };
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState: EntityState<Post, string> & {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
} = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // const response = await client.get("/fakeApi/posts");
  // return response.data;
  const response = await client.get<Post[]>("/api/fakeApi/posts"); // Next.js API Routes
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: NewPost) => {
    // const response = await client.post("/fakeApi/posts", initialPost);
    const response = await client.post<Post>("/api/fakeApi/posts", initialPost); // Next.js API Routes
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     // state.push(action.payload);
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           hooray: 0,
    //           heart: 0,
    //           rocket: 0,
    //           eyes: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: keyof PostReactions }>
    ) {
      const { postId, reaction } = action.payload;
      // const existingPost = state.find((post) => post.id === postId);
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      // const existingPost = state.find((post) => post.id === id);
      // const existingPost = state.posts.find((post) => post.id === id);
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // .addCase(addNewPost.fulfilled, (state, action) => {
      //   state.posts.push(action.payload);
      // });
      // Use the `addOne` reducer for the fulfilled case
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { /* postAdded, */ postUpdated, reactionAdded } =
  postsSlice.actions;

export default postsSlice.reducer;

// export const selectAllPosts = (state: RootState) => state.posts;

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.find((post) => post.id === postId);
// export const selectAllPosts = (state: RootState) => state.posts.posts;

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.posts.find((post) => post.id === postId);
// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);

/* Types */
// export type PostSliceState = {
//   posts: Post[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// };

export type Post = {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: PostReactions;
};

export type PostReactions = {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type NewPost = Omit<Post, "id" | "date" | "reactions">;

export type EditPost = Omit<Post, "user" | "date" | "reactions">;

export type AddReaction = {
  postId: string;
  reaction: keyof PostReactions;
};

// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../slices/postsSlice/postsSlice";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  //   baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  baseQuery: fetchBaseQuery({ baseUrl: "/api/fakeApi" }), // Next.js API Routes
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query<Post[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => "/posts",
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice;

import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { Post } from "../postsSlice/postsSlice";
import { RootState } from "../../store";

// const initialState: UserSliceState = [
//   // { id: "0", name: "Tianna Jenkins" },
//   // { id: "1", name: "Kevin Grant" },
//   // { id: "2", name: "Madison Price" },
// ];
/* Temporarily ignore adapter - we'll use this again shortly
const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();
*/

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = apiSlice.endpoints.getUsers.select();

// export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
//   // const response = await client.get("/fakeApi/users");
//   const response = await client.get<User[]>("/api/fakeApi/users"); // Next.js API Routes
//   return response.data;
// });
const emptyUsers: User[] = [];

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     // builder.addCase(fetchUsers.fulfilled, (state, action) => {
//     //   return action.payload;
//     // });
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
//   },
// });
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
);

// export default usersSlice.reducer;
export const selectUserById = createSelector(
  selectAllUsers,
  (state: RootState, userId: string) => userId,
  (users: User[], userId: string) => users.find((user) => user.id === userId)
);

// export const selectAllUsers = (state: RootState) => state.users;

// export const selectUserById = (state: RootState, userId: string) =>
//   state.users.find((user) => user.id === userId);
/* Temporarily ignore selectors - we'll come back to this later
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users);
*/

// export type UserSliceState = User[];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  posts: Post[];
};

import { client } from "@/app/api/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../postsSlice/postsSlice";
import { RootState } from "../../store";

const initialState: UserSliceState = [
  // { id: "0", name: "Tianna Jenkins" },
  // { id: "1", name: "Kevin Grant" },
  // { id: "2", name: "Madison Price" },
];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // const response = await client.get("/fakeApi/users");
  const response = await client.get<User[]>("/api/fakeApi/users"); // Next.js API Routes
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: string) =>
  state.users.find((user) => user.id === userId);

export type UserSliceState = User[];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  posts: Post[];
};

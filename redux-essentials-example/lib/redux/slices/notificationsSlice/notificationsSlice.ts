import { client } from "@/app/api/client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState);
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    // const response = await client.get(
    //   `/fakeApi/notifications?since=${latestTimestamp}`
    // );
    const response = await client.get<Notification[]>(
      `/api/fakeApi/notifications?since=${latestTimestamp}`
    ); // Next.js API Routes
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [] as NotificationSliceState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export default notificationsSlice.reducer;

export const selectAllNotifications = (state: RootState) => state.notifications;

export type NotificationSliceState = Notification[];

export type Notification = {
  id: string;
  date: string;
  message: string;
  user: string;
};

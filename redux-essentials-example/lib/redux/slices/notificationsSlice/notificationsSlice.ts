import { client } from "@/app/api/client";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

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
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state /* action */) {
      // state.forEach((notification) => {
      //   notification.read = true;
      // });
      Object.values(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      // state.push(...action.payload);
      // state.forEach((notification) => {
      //   // Any notifications we've read are no longer new
      //   notification.isNew = !notification.read;
      // });
      // // Sort with newest first
      // state.sort((a, b) => b.date.localeCompare(a.date));
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

// export const selectAllNotifications = (state: RootState) => state.notifications;
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notifications);

// export type NotificationSliceState = Notification[];

export type Notification = {
  id: string;
  date: string;
  message: string;
  user: string;
  read: boolean;
  isNew: boolean;
};

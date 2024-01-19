import { faker } from "@faker-js/faker";
import { nanoid } from "@reduxjs/toolkit";
import { parseISO } from "date-fns";

const NUM_USERS = 3;
const POSTS_PER_USER = 3;
const RECENT_NOTIFICATIONS_DAYS = 7;

// Add an extra delay to all endpoints, so loading spinners show up.
export const ARTIFICIAL_DELAY_MS = 2000;

type User = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  username: string;
  posts: Post[];
};

type UserData = {
  firstName: string;
  lastName: string;
  name: string;
  username: string;
};

export type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  reactions: Reaction;
  comments: Comment[];
  user: User | null;
};
type Comment = {
  id: string;
  date: string;
  text: string;
  post: Post;
};
type Reaction = {
  id: string;
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
  post: Post;
};

type StringNullableFilter = {
  equals?: string | null;
};

type UserWhereInput = {
  id?: StringNullableFilter | string | null;
};

export type userFindFirstArgs<ExtArgs = {}> = {
  where?: UserWhereInput;
} & ExtArgs;

type PostWhereInput = {
  id?: StringNullableFilter | string | null;
};

export type postFindFirstArgs<ExtArgs = {}> = {
  where?: PostWhereInput;
} & ExtArgs;

type postUpdateInput = {
  id?: StringNullableFilter | string | null;
  title?: StringNullableFilter | string | null;
  content?: StringNullableFilter | string | null;
};

export type postUpdateArgs<ExtArgs = {}> = {
  where?: PostWhereInput;
  data: postUpdateInput;
} & ExtArgs;

export type SelectSubset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};

export function getRandomInt(min: number, max: number) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  // return Math.floor(rng() * max - min + 1) + min;
  return faker.number.int({ min, max });
}

const randomFromArray = <T>(array: T[]) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

export const db = {
  users: [] as User[],
  posts: [] as Post[],
  Comment: [] as Comment[],
  reactions: [] as Reaction[],

  user: {
    create: (userData: UserData) => {
      const newUser: User = {
        id: faker.string.uuid(),
        posts: [] as Post[],
        ...userData,
      };
      db.users.push(newUser);
      return newUser;
    },
    getAll: () => db.users,
    findFirst: (args: SelectSubset<userFindFirstArgs, userFindFirstArgs>) => {
      const { where } = args || {};

      if (where?.id instanceof Object && "equals" in where.id) {
        if (typeof where.id.equals === "string") {
          const value = where.id.equals;
          return db.users.find((user) => user.id === value) || null;
        }
      }

      return null;
    },
  },

  post: {
    create: (postData: Partial<Post>) => {
      const newPost: Post = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        date: faker.date
          .recent({ days: RECENT_NOTIFICATIONS_DAYS })
          .toISOString(),
        user: {} as User, // Fill this in with the actual user data
        content: faker.lorem.paragraphs(),
        comments: [] as Comment[],
        reactions: db.reaction.create(),
        ...postData,
      };
      db.posts.push(newPost);
      return newPost;
    },
    getAll: () => db.posts,
    findFirst: (args: SelectSubset<postFindFirstArgs, postFindFirstArgs>) => {
      const { where } = args || {};

      if (where?.id instanceof Object && "equals" in where.id) {
        if (typeof where.id.equals === "string") {
          const value = where.id.equals;
          return db.posts.find((post) => post.id === value) || null;
        }
      }

      return null;
    },
    update: (args: SelectSubset<postUpdateArgs, postUpdateArgs>) => {
      const { where, data } = args || {};

      if (where?.id instanceof Object && "equals" in where.id) {
        const postId = where.id.equals;
        // Find the post based on the provided 'id'
        const postToUpdate = db.posts.find((post) => post.id === postId);

        // If the post is found, update its properties
        if (postToUpdate) {
          if (typeof data.title === "string") {
            postToUpdate.title = data.title;
          }
          if (typeof data.content === "string") {
            postToUpdate.content = data.content;
          }

          // You can update other properties similarly

          return postToUpdate;
        }
      }

      // Return null if the post is not found or if the update conditions are not met
      return null;
    },
  },

  reaction: {
    create: () => {
      const newReaction: Reaction = {
        id: faker.string.uuid(),
        thumbsUp: faker.number.int({ max: 50 }),
        hooray: faker.number.int({ max: 50 }),
        heart: faker.number.int({ max: 50 }),
        rocket: faker.number.int({ max: 50 }),
        eyes: faker.number.int({ max: 50 }),
        post: {} as Post, // Fill this in with the actual post data
      };
      db.reactions.push(newReaction);
      return newReaction;
    },
  },
};

const createUserData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.userName(),
  };
};

const createPostData = (user: User) => {
  return {
    title: faker.lorem.words(),
    date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
    user,
    content: faker.lorem.paragraphs(),
    reactions: db.reaction.create(),
  };
};

// Create an initial set of users and posts
for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData());

  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author);
    db.post.create(newPost);
  }
}

export const serializePost = (post: Post) => ({
  ...post,
  user: post.user?.id,
});

/* Random Notifications Generation */

const notificationTemplates = [
  "poked you",
  "says hi!",
  `is glad we're friends`,
  "sent you a gift",
];

export function generateRandomNotifications(
  since: string | undefined,
  numNotifications: number,
  db: any
) {
  const now = new Date();
  let pastDate: Date;

  if (since) {
    pastDate = parseISO(since);
  } else {
    pastDate = new Date(now.valueOf());
    pastDate.setMinutes(pastDate.getMinutes() - 15);
  }

  // Create N random notifications. We won't bother saving these
  // in the DB - just generate a new batch and return them.
  const notifications = [...Array(numNotifications)].map(() => {
    const user: User = randomFromArray(db.user.getAll());
    const template = randomFromArray(notificationTemplates);
    return {
      id: nanoid(),
      date: faker.date.between({ from: pastDate, to: now }).toISOString(),
      message: template,
      user: user.id,
    };
  });

  return notifications;
}

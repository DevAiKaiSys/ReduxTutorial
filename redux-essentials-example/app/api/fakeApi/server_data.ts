import { faker } from "@faker-js/faker";

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

type Post = {
  id: string;
  title: string;
  date: string;
  content: string;
  reactions: Reaction;
  comments: Comment[];
  user: User;
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
  user: post.user.id,
});

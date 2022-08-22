import { getUserWithUsername, postToJSON } from "../../lib/firebase";

// Components:
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";

export async function getServerSideProps({ query: _query }) {
  const { username } = _query;

  const userDoc = await getUserWithUsername(username);

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsColRef = collection(firestore, `users/${userDoc.id}/posts`);
    const q = query(
      postsColRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(q)).docs.map(postToJSON);
  } else {
    return {
      notFound: true,
    };
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
}

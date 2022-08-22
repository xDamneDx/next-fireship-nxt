import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { collectionGroup, getDoc, doc, getDocs } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

// Components:
import PostContent from "../../components/PostContent";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(firestore, `users/${userDoc.id}/posts/${slug}`);
    post = postToJSON(await getDoc(postRef));
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function PostPage(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  return (
    <main>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 💗</strong>
        </p>
      </aside>
    </main>
  );
}

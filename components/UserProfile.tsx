/* eslint-disable @next/next/no-img-element */
// UI component for user profile
export default function UserProfile({ user }) {
  return (
    <div className="box-center">
      <img src={user.photoURL} className="card-img-center" alt="user avatar" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}

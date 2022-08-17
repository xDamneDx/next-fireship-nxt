import { useContext } from "react";
import { UserContext } from "../lib/context";
import Link from "next/link";
import Image from "next/image";

// Top navbar:
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">NXT</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <>
                  <Image
                    src={user?.photoURL ? user?.photoURL : "/hacker.png"}
                    width="50px"
                    height="50px"
                    alt="user avatar"
                  />
                </>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

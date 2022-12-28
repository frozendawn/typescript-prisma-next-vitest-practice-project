import UserOptions from "../UserOptions";
import UserContext from "../../context/context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

const Navbar = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="h-8 text-pink flex justify-between items-center max-w-full">
      <span className="text-gray-dark ml-xl cursor-pointer" onClick={() => { router.push('/') }}>Brand</span>
      <div>
        {
          user ?
            <UserOptions /> :
            <ul className="flex gap-s mr-xl">
              <li className="text-gray-dark">
                <Link href="/sign-in">Sign in</Link>
              </li>
              <li className="text-gray-dark">
                <Link href="/sign-up">Register</Link>
              </li>
            </ul>
        }
      </div>
    </div>
  )
}

export default Navbar;
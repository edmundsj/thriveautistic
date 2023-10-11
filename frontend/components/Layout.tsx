import DeployButton from "@/components/DeployButton";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import {useUser} from "@/hooks/users";

export function Navbar() {
  const {data: user} = useUser()
  const userComponent = user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!
          <LogoutButton />
        </div>
      ) : (
        <div>
          <Link
            href="/login"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
        </div>

    )

  return (
    <nav className="w-full flex justify-between flex-end border-b border-b-foreground/10 h-16 flex-end">
      <div className="w-full max-w-4xl p-3 text-sm text-foreground flex justify-end">
        {userComponent}
      </div>
    </nav>
  )
}
export function Layout({children}:{children: any}) {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}
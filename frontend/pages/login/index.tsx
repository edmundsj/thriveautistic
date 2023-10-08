import Link from 'next/link'
import Messages from './messages'


export default function Login() {
  return (
    <div className={'p-4 mx-auto'} style={{maxWidth: "400px", paddingTop: "20%"}}>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground mx-auto max-w-xs p-4"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md p-4 py-2 bg-inherit border mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md p-4 py-2 bg-inherit border mb-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          className="rounded py-2 mb-2"
          style={{border: "2px", borderColor: "black"}}
        >
          Sign In
        </button>
        <button
          formAction="/auth/sign-up"
          className="border border-gray-700 py-2 rounded-md"
          style={{backgroundColor: '#2196F3', color: "white"}}
        >
          Sign Up
        </button>
        <Messages />
      </form>
    </div>
  )
}

import Link from 'next/link';


export default function Index() {
  return (
    <div>
      <p>Hello Next.js</p>
      <p>
      <Link href="/app">
        <a>App Page</a>
      </Link>
      </p><p>
      <Link href="/timer">
        <a>Timer Page</a>
      </Link>
      </p>
    </div>
  );
}
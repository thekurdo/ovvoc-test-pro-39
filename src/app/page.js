import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome</h1>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority
      />
      <nav>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </main>
  );
}

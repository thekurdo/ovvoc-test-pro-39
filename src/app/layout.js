export const metadata = {
  title: 'My Next.js App',
  description: 'A sample Next.js 13 application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

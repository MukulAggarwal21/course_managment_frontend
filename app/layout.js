import '../styles/globals.css';

export const metadata = {
  title: 'Course Management System',
  description: 'Frontend for Course Management System'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <a href="/" style={{ marginRight: 10 }}>Home</a>
          <a href="/users" style={{ marginRight: 10 }}>Users</a>
          <a href="/courses" style={{ marginRight: 10 }}>Courses</a>
          <a href="/packages">Packages</a>
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}

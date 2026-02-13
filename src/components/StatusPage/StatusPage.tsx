import Footer from "@components/layout/Footer/Footer";
import Header from "@components/layout/Header/Header";
import Link from "next/link";

export default function StatusPage({
  code,
  title,
  description,
}: {
  code: number;
  title: string;
  description: string;
}) {
  return (
    <>
      <Header />
      <main style={{ padding: 32 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>{code}</h1>
        <h2 style={{ marginBottom: 8 }}>{title}</h2>
        <p style={{ marginBottom: 16 }}>{description}</p>
        <Link href="/">홈으로</Link>
      </main>
      <Footer />
    </>
  );
}

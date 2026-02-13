import StatusPage from "@components/StatusPage/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code={404}
      title="Not Found"
      description="요청하신 페이지를 찾을 수 없어요."
    />
  );
}

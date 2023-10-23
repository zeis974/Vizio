import { styled } from "@kuma-ui/core";

import Header from "@/components/Interface/Home/Header";

export default function Home() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

const Container = styled("main")`
  width: 100%;
  justify-content: center;
  display: flex;
  padding: 20px 10px;
`;

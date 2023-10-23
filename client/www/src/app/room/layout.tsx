import { styled } from "@kuma-ui/core";

import { PropsWithChildren } from "react";
import { Metadata } from "next";

import Header from "@/components/Interface/Room/Header";

export const metadata: Metadata = {
  title: "Room",
};

export default function RoomLayout({ children }: PropsWithChildren) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

const Container = styled("div")`
  background: #262c33;
  width: calc(100% - 50px);
  margin: 10px;
  border-radius: 10px;
  position: relative;
`;

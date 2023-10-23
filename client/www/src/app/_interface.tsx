"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { styled } from "@kuma-ui/core";

import SockJS from "sockjs-client";

import ws from "@/lib/ws";

import NotFound from "@/components/Interface/ui/NotFound";
import Loading from "@/components/Interface/ui/Loading";
import Sidebar from "@/components/Interface/ui/Sidebar";

const state = {
  CONNECTED: true,
  ERROR: false,
};

export default function Interface({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function checkConnection() {
      if (!ignore) {
        const socket = new ws();

        socket
          .initConnection()
          .then(() => {
            setStatus(state.CONNECTED);
            setLoading(false);
          })
          .catch(() => {
            setStatus(state.ERROR);
            setLoading(false);
          });
      }
    }

    checkConnection();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  } else if (status === state.ERROR) {
    return <NotFound />;
  }

  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
}

const Container = styled("div")`
  display: flex;
`;

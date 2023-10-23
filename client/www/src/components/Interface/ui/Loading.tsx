import { styled } from "@kuma-ui/core";

export default function Loading() {
  return (
    <Container>
      <LoadingIcon />
    </Container>
  );
}

const Container = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingIcon = styled("div")`
  width: 75px;
  height: 75px;
  margin: 0;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 4px solid transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

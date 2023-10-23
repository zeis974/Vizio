import { styled } from "@kuma-ui/core";

export default function Header() {
  return (
    <Container>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  );
}

const Container = styled("div")`
  max-width: 1800px;
  width: 100%;
  height: 200px;
  background: red;
  display: flex;
  justify-content: center;
  gap: 50px;

  & > div {
    background: green;
    width: 400px;
    height: 100%;
    border-radius: 10px;
  }

  & > div::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    background: red;
  }
`;

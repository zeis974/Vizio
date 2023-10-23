import { styled } from "@kuma-ui/core";

export default function NotFound() {
  return (
    <Container>
      <span>Impossible de se connecter au serveur</span>
      <button
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Retenter une connexion
      </button>
    </Container>
  );
}

const Container = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  font-weight: 500;
  font-family: var(--nativeFont);

  & > span {
    font-size: clamp(16px, 2.5vw, 2em);
  }

  & > button {
    background: transparent;
    border: 2px solid #2980b9;
    color: inherit;
    padding: 10px 5px;
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;

    transition: 150ms;

    &:hover {
      background: #2980b9;
      max-width: 200px;
    }
  }
`;

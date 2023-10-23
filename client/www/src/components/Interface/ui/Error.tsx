import { styled } from "@kuma-ui/core";
import Link from "next/link";

export type ErrorType = "system" | "user" | "not exist";

export default function ErrorPermission({
  error,
}: {
  error: { error: boolean; cause: ErrorType };
}) {
  const errorMessage =
    error.cause === "not exist" ? (
      <div>
        La salle n&apos;existe pas, n&apos;hésitez pas à{" "}
        <Link href="/room">en créer une ou à en rejoindre une autre</Link>.
      </div>
    ) : error.cause === "system" ? (
      "Il semblerait que le système empêche l'accès à la caméra et au micro."
    ) : (
      "Vous avez refusé l'accès à la caméra et au micro."
    );

  return (
    <Container>
      <h2>
        {error.cause === "not exist"
          ? "La salle n'existe pas"
          : "Erreur d'autorisation"}
      </h2>
      {errorMessage && <>{errorMessage}</>}
    </Container>
  );
}

const Container = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  font-family: var(--nativeFont, sans-serif);

  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  & > h2 {
    font-size: 1.5em;
  }

  & a {
    color: #3498db;
  }
`;

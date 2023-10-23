import { styled } from "@kuma-ui/core";

import Icons from "@/components/Icons";

import { Icons as IconsTypes } from "@/types/types";

export default function Sidebar() {
  let icons: IconsTypes[] = ["home", "videos", "users", "settings"];

  return (
    <Container>
      {icons.map((icon) => (
        <Icons key={icon} icon={icon} />
      ))}
    </Container>
  );
}

const Container = styled("div")`
  height: 100vh;
  min-width: 100px;
  gap: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & > a {
    line-height: 0;
    padding: 15px;
    border-radius: 5px;
    transition: 150ms;

    &[data-active="true"],
    &:hover {
      background: #3c3c3c;
    }
  }
`;

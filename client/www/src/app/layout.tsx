import "@/styles/globals.css";

import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
// import { AppProvider } from "@/context/appContext";

import Interface from "./_interface";

export const metadata: Metadata = {
  title: {
    template: "%s | Vizio",
    default: "Vizio",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
        <KumaRegistry>
          <Interface>{children}</Interface>
        </KumaRegistry>
      </body>
    </html>
  );
}

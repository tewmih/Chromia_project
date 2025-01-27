"use client";

import "./globals.css";
import React from "react";
import DefaultComponent from "./DefaultWrapper";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className="">
        <DefaultComponent>{children}</DefaultComponent>
      </body>
    </html>
  );
}

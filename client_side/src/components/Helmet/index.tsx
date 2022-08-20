import React, { ReactChild, ReactChildren } from "react";
import { Helmet as HelmetCompoennt } from "react-helmet";

interface HelmetProps {
  children: ReactChild | ReactChildren;
  title: string;
  description: string;
}

export default function Helmet({
  title,
  description,
  children,
}: HelmetProps): JSX.Element {
  return (
    <>
      <HelmetCompoennt>
        <title>{title}</title>
        <meta name="description" content={description} />
      </HelmetCompoennt>
      {children}
    </>
  );
}

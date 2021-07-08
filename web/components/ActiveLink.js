import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.asPath === `/${href}`) {
    className = `${className} text-lime`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
};

export default ActiveLink;

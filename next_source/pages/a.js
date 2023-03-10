import React from "react";

const a = ({ message }) => {
  return <div>{message}</div>;
};

export async function getStaticProps(context) {
  return {
    props: { message: "SSG 실험입니다." }, // will be passed to the page component as props
  };
}

export default a;

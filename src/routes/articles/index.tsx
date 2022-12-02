import {
  component$,
  useClientEffect$,
  useServerMount$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { DocumentHead, useLocation } from "@builder.io/qwik-city";
import styles from "./flower.css?inline";
import Article from "~/components/article.component";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <h1>Hi</h1>
      <Article></Article>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};

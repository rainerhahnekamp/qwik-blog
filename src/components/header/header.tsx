import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <a href="/">
        <h1>Rainer Hahnekamp</h1>
      </a>
      <ul>
        <li>
          <a href="/admin">Administration</a>
        </li>
        <li>
          <a href="https://qwik.builder.io/docs/components/overview/">
            Articles
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/examples/introduction/hello-world/">
            Videos
          </a>
        </li>
        <li>
          <a href="https://qwik.builder.io/tutorial/welcome/overview/">
            Slides
          </a>
        </li>
      </ul>
    </header>
  );
});

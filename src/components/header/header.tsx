import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <a href="/">
        <h1 class="pl-4">My Blog</h1>
      </a>
      <ul>
        <li>
          <a href="/admin">Add Article</a>
        </li>
      </ul>
    </header>
  );
});

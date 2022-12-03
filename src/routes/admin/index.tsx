import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <form>
      <input name="name" placeholder="Name" />
      <textarea name="content" placeholder="Content"></textarea>
    </form>
  );
});

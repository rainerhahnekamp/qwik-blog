import { component$, PropFunction } from "@builder.io/qwik";

export type ButtonProps = {
  label: string;
  onClick$: PropFunction<() => void>;
  type?: "submit" | "reset";
};

export default component$((props: ButtonProps) => {
  return (
    <button
      type={props.type || "button"}
      onClick$={() => props.onClick$()}
      class="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
    "
    >
      {props.label}
    </button>
  );
});

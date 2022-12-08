import { component$, PropFunction } from "@builder.io/qwik";

export type ButtonProps = {
  label: string;
  onClick$: PropFunction<() => void>;
  type?: "submit" | "reset" | "button";
};

export default component$((props: ButtonProps) => {
  return (
    <button
      type={props.type || "button"}
      onClick$={() => props.onClick$()}
      class="btn-default"
    >
      {props.label}
    </button>
  );
});

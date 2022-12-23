import { component$, PropFunction } from "@builder.io/qwik";

export type TextareaProps = {
  label?: string;
  name: string;
  value?: string;

  onInput$?: PropFunction<(value: string) => void>;
  placeholder?: string;
  hint?: string;
  rows?: number;
};

export default component$((props: TextareaProps) => {
  return (
    <div className="form-group mb-6">
      {props.label ? (
        <label className="form-label inline-block mb-2 text-gray-700">
          {props.label}
        </label>
      ) : (
        <></>
      )}
      <textarea
        value={props.value || ""}
        rows={props.rows || 5}
        onInput$={(event) => {
          if (props.onInput$) {
            props.onInput$((event.target as HTMLInputElement).value);
          }
        }}
        class="default"
      ></textarea>
      {props.hint ? (
        <small id="emailHelp" class="block mt-1 text-xs text-gray-600">
          {props.hint}
        </small>
      ) : (
        <></>
      )}
    </div>
  );
});

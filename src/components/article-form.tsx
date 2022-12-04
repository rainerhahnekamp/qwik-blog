import { component$, PropFunction, useStore } from "@builder.io/qwik";
import Input from "~/components/forms/input";
import Textarea from "~/components/forms/textarea";
import Button from "~/components/forms/button";

export type ArticleFormData = {
  name: string;
  teaser: string;
  content: string;
  url: string;
};

type ArticleFormProps = {
  article: ArticleFormData;
  onSubmit$: PropFunction<(formData: ArticleFormData) => void>;
  onRemove$?: PropFunction<() => void>;
};

export default component$((props: ArticleFormProps) => {
  const state = useStore(props.article);
  return (
    <div>
      <form>
        <div className="block p-6 rounded-lg shadow-lg bg-white">
          <Input
            name="name"
            label="Name"
            value={props.article.name}
            onInput$={(name) => {
              state.name = name;
            }}
          />

          <Textarea
            name="teaser"
            label="Teaser"
            value={props.article.teaser}
            rows={2}
            onInput$={(teaser) => {
              state.teaser = teaser;
            }}
          />
          <Input
            label="Url"
            name="url"
            value={props.article.url}
            onInput$={(url) => {
              state.url = url;
            }}
          />

          <Textarea
            name="content"
            label="Content"
            value={props.article.content}
            onInput$={(content) => {
              state.content = content;
            }}
          />
          <div class="flex gap-4">
            <Button onClick$={() => props.onSubmit$(state)} label="Save" />
            {props.onRemove$ ? (
              <Button onClick$={props.onRemove$} label="Delete" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

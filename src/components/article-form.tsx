import {
  component$,
  PropFunction,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import Input from "~/components/forms/input";
import Textarea from "~/components/forms/textarea";
import Button from "~/components/forms/button";
import { marked } from "marked";

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
  const previewEnabled = useSignal(false);
  const markdown = useSignal("");
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

          {previewEnabled.value ? (
            <>
              <label>Content</label>
              <div className="grid grid-cols-2 gap-2">
                <Textarea
                  name="content"
                  value={props.article.content}
                  onInput$={(content) => {
                    markdown.value = marked.parse(content);
                    state.content = content;
                  }}
                ></Textarea>
                <div dangerouslySetInnerHTML={markdown.value}></div>
              </div>
              <Button
                label={"Hide Preview"}
                onClick$={() => {
                  previewEnabled.value = false;
                }}
              ></Button>
            </>
          ) : (
            <>
              <Textarea
                name="content"
                label="Content"
                value={props.article.content}
                onInput$={(content) => {
                  state.content = content;
                }}
              />
              <button
                class="btn-default"
                type="button"
                onClick$={() => {
                  markdown.value = marked.parse(state.content);
                  previewEnabled.value = true;
                }}
              >
                Show Preview
              </button>
            </>
          )}
          <div class="flex gap-4 mt-8">
            <button
              type="submit"
              onClick$={() => props.onSubmit$(state)}
              class="btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick$={props.onRemove$}
              class="btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
});

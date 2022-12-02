export type Article = {
  id: number;
  name: string;
  publishedAt: Date;
};

let id = 1;
const defaultArticle: Article = {
  id: id++,
  name: "Article",
  publishedAt: new Date(),
};

export function createArticle(article: Partial<Article> = {}) {
  return { ...defaultArticle, ...article };
}

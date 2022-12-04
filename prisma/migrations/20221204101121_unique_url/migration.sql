/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_url_key" ON "Article"("url");

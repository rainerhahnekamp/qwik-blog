/*
  Warnings:

  - Added the required column `teaser` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "teaser" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publishedAt" DATETIME
);
INSERT INTO "new_Article" ("content", "createdAt", "id", "name", "publishedAt", "updatedAt", "teaser", "url") SELECT "content", "createdAt", "id", "name", "publishedAt", "updatedAt", '', '' FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

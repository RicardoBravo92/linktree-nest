-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "clicks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

WITH ranked_links AS (
  SELECT
    "id",
    ROW_NUMBER() OVER (
      PARTITION BY "userId"
      ORDER BY "createdAt", "id"
    ) - 1 AS "newOrder"
  FROM "Link"
)
UPDATE "Link" AS l
SET "order" = ranked_links."newOrder"
FROM ranked_links
WHERE l."id" = ranked_links."id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bgColor" TEXT DEFAULT '#9333ea',
ADD COLUMN     "bgGradient" TEXT,
ADD COLUMN     "buttonStyle" TEXT DEFAULT 'rounded',
ADD COLUMN     "fontFamily" TEXT DEFAULT 'sans';

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_userId_platform_key" ON "SocialLink"("userId", "platform");

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

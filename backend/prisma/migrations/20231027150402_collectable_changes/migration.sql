/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collectable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AchievementToProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatsUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_wares` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MANAGER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_revieweeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_collectableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trade" DROP CONSTRAINT "Trade_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AchievementToProfile" DROP CONSTRAINT "_AchievementToProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AchievementToProfile" DROP CONSTRAINT "_AchievementToProfile_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ChatsUsers" DROP CONSTRAINT "_ChatsUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ChatsUsers" DROP CONSTRAINT "_ChatsUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_inventory" DROP CONSTRAINT "_inventory_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_inventory" DROP CONSTRAINT "_inventory_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wares" DROP CONSTRAINT "_wares_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wares" DROP CONSTRAINT "_wares_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wishlist" DROP CONSTRAINT "_wishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_wishlist" DROP CONSTRAINT "_wishlist_B_fkey";

-- DropTable
DROP TABLE "public"."Achievement";

-- DropTable
DROP TABLE "public"."Chat";

-- DropTable
DROP TABLE "public"."Collectable";

-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Profile";

-- DropTable
DROP TABLE "public"."Review";

-- DropTable
DROP TABLE "public"."Trade";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_AchievementToProfile";

-- DropTable
DROP TABLE "public"."_ChatsUsers";

-- DropTable
DROP TABLE "public"."_inventory";

-- DropTable
DROP TABLE "public"."_wares";

-- DropTable
DROP TABLE "public"."_wishlist";

-- DropEnum
DROP TYPE "public"."Role";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "reputation" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "collectableName" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "price" INTEGER NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectable" (
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Collectable_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "CollectableCount" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CollectableCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "tags" TEXT[],
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AchievementToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChatsUsers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_collection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_inventory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_wishlist" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_wares" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CampaignToCollection" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_managers" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_name_key" ON "Profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_name_key" ON "Achievement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collectable_name_key" ON "Collectable"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToProfile_AB_unique" ON "_AchievementToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToProfile_B_index" ON "_AchievementToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatsUsers_AB_unique" ON "_ChatsUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatsUsers_B_index" ON "_ChatsUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_collection_AB_unique" ON "_collection"("A", "B");

-- CreateIndex
CREATE INDEX "_collection_B_index" ON "_collection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_inventory_AB_unique" ON "_inventory"("A", "B");

-- CreateIndex
CREATE INDEX "_inventory_B_index" ON "_inventory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_wishlist_AB_unique" ON "_wishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_wishlist_B_index" ON "_wishlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_wares_AB_unique" ON "_wares"("A", "B");

-- CreateIndex
CREATE INDEX "_wares_B_index" ON "_wares"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToCollection_AB_unique" ON "_CampaignToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToCollection_B_index" ON "_CampaignToCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_managers_AB_unique" ON "_managers"("A", "B");

-- CreateIndex
CREATE INDEX "_managers_B_index" ON "_managers"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_collectableName_fkey" FOREIGN KEY ("collectableName") REFERENCES "Collectable"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectableCount" ADD CONSTRAINT "CollectableCount_name_fkey" FOREIGN KEY ("name") REFERENCES "Collectable"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToProfile" ADD CONSTRAINT "_AchievementToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsUsers" ADD CONSTRAINT "_ChatsUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsUsers" ADD CONSTRAINT "_ChatsUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_A_fkey" FOREIGN KEY ("A") REFERENCES "Collectable"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_collection" ADD CONSTRAINT "_collection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventory" ADD CONSTRAINT "_inventory_A_fkey" FOREIGN KEY ("A") REFERENCES "CollectableCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_inventory" ADD CONSTRAINT "_inventory_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlist" ADD CONSTRAINT "_wishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "CollectableCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wishlist" ADD CONSTRAINT "_wishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wares" ADD CONSTRAINT "_wares_A_fkey" FOREIGN KEY ("A") REFERENCES "CollectableCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_wares" ADD CONSTRAINT "_wares_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCollection" ADD CONSTRAINT "_CampaignToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToCollection" ADD CONSTRAINT "_CampaignToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_managers" ADD CONSTRAINT "_managers_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_managers" ADD CONSTRAINT "_managers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

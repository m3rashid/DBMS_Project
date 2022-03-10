CREATE TYPE "Gender" AS ENUM ('male', 'female', 'others');
-- 
CREATE TYPE "Status" AS ENUM (
  'STRANGERS',
  'REQUESTED',
  'FRIENDS',
  'BLOCKED_TO',
  'BLOCKED_BY'
);
-- 
CREATE TYPE "earSize" AS ENUM ('small', 'big');
-- 
CREATE TYPE "sex" AS ENUM ('man', 'woman');
-- 
CREATE TYPE "hairStyle" AS ENUM (
  'normal',
  'thick',
  'mohawk',
  'womanLong',
  'womanShort'
);
-- 
CREATE TYPE "hatStyle" AS ENUM ('none', 'beanie', 'turban');
-- 
CREATE TYPE "glassesStyle" AS ENUM ('none', 'round', 'square');
-- 
CREATE TYPE "noseStyle" AS ENUM ('short', 'long', 'round');
-- 
CREATE TYPE "mouthStyle" AS ENUM ('laugh', 'smile', 'peace');
-- 
CREATE TYPE "shirtStyle" AS ENUM ('hoody', 'short', 'polo');
-- 
-- 
CREATE TABLE "Admin" (
  "userID" TEXT NOT NULL,
  "userName" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Admin_pkey" PRIMARY KEY ("userID")
);
-- 
CREATE TABLE "Topic" (
  "topicID" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Topic_pkey" PRIMARY KEY ("topicID")
);
-- 
CREATE TABLE "Post" (
  "postID" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "topicID" TEXT NOT NULL,
  "userID" TEXT NOT NULL,
  "likes" INTEGER NOT NULL DEFAULT 0,
  "commentsCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Post_pkey" PRIMARY KEY ("postID")
);
-- 
CREATE TABLE "Comments" (
  "commentID" TEXT NOT NULL,
  "postID" TEXT NOT NULL,
  "userID" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Comments_pkey" PRIMARY KEY ("commentID")
);
-- 
CREATE TABLE "Classification" (
  "classificationID" TEXT NOT NULL,
  "identity_attack" DECIMAL(65, 30) NOT NULL,
  "insult" DECIMAL(65, 30) NOT NULL,
  "obscene" DECIMAL(65, 30) NOT NULL,
  "severe_toxicity" DECIMAL(65, 30) NOT NULL,
  "sexual_explicit" DECIMAL(65, 30) NOT NULL,
  "threat" DECIMAL(65, 30) NOT NULL,
  "toxicity" DECIMAL(65, 30) NOT NULL,
  "postID" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Classification_pkey" PRIMARY KEY ("classificationID")
);
-- 
CREATE TABLE "User" (
  "userID" TEXT NOT NULL,
  "userName" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phNumber" TEXT NOT NULL,
  "gender" "Gender" NOT NULL,
  "dob" TIMESTAMP(3) NOT NULL,
  "avatarID" TEXT NOT NULL,
  "reputation" DECIMAL(65, 30) NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);
-- 
CREATE TABLE "Friendship" (
  "friendshipID" TEXT NOT NULL,
  "fromID" TEXT NOT NULL,
  "toID" TEXT NOT NULL,
  "status" "Status" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Friendship_pkey" PRIMARY KEY ("friendshipID")
);
-- 
CREATE TABLE "Avatar" (
  "avatarID" TEXT NOT NULL,
  "sex" "sex" NOT NULL,
  "faceColor" TEXT NOT NULL,
  "earSize" "earSize" NOT NULL,
  "hairColor" TEXT NOT NULL,
  "hairStyle" "hairStyle" NOT NULL,
  "hatColor" TEXT NOT NULL,
  "hatStyle" "hatStyle" NOT NULL,
  "glassesStyle" "glassesStyle" NOT NULL,
  "noseStyle" "noseStyle" NOT NULL,
  "mouthStyle" "mouthStyle" NOT NULL,
  "shirtStyle" "shirtStyle" NOT NULL,
  "shirtColor" TEXT NOT NULL,
  "bgColor" TEXT NOT NULL,
  "isGradient" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Avatar_pkey" PRIMARY KEY ("avatarID")
);
-- 
-- 
CREATE UNIQUE INDEX "Admin_userName_key" ON "Admin"("userName");
-- 
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
-- 
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");
-- 
ALTER TABLE "Post"
ADD CONSTRAINT "Post_topicID_fkey" FOREIGN KEY ("topicID") REFERENCES "Topic"("topicID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Post"
ADD CONSTRAINT "Post_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Comments"
ADD CONSTRAINT "Comments_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("postID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Comments"
ADD CONSTRAINT "Comments_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Classification"
ADD CONSTRAINT "Classification_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("postID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "User"
ADD CONSTRAINT "User_avatarID_fkey" FOREIGN KEY ("avatarID") REFERENCES "Avatar"("avatarID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Friendship"
ADD CONSTRAINT "Friendship_fromID_fkey" FOREIGN KEY ("fromID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
-- 
ALTER TABLE "Friendship"
ADD CONSTRAINT "Friendship_toID_fkey" FOREIGN KEY ("toID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
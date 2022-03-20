-- CreateTable
CREATE TABLE `Admin` (
  `userID` VARCHAR(191) NOT NULL,
  `userName` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `Admin_userName_key`(`userName`),
  PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Topic` (
  `topicID` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `Topic_name_key`(`name`),
  PRIMARY KEY (`topicID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Post` (
  `postID` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `description` VARCHAR(191) NOT NULL,
  `topicID` VARCHAR(191) NOT NULL,
  `userID` VARCHAR(191) NOT NULL,
  `likes` INTEGER NOT NULL DEFAULT 0,
  `reputation` DECIMAL(65, 30) NULL,
  `commentsCount` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`postID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Comments` (
  `commentID` VARCHAR(191) NOT NULL,
  `postID` VARCHAR(191) NOT NULL,
  `userID` VARCHAR(191) NOT NULL,
  `text` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`commentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Classification` (
  `classificationID` VARCHAR(191) NOT NULL,
  `identity_attack` DECIMAL(65, 30) NOT NULL,
  `insult` DECIMAL(65, 30) NOT NULL,
  `obscene` DECIMAL(65, 30) NOT NULL,
  `severe_toxicity` DECIMAL(65, 30) NOT NULL,
  `sexual_explicit` DECIMAL(65, 30) NOT NULL,
  `threat` DECIMAL(65, 30) NOT NULL,
  `toxicity` DECIMAL(65, 30) NOT NULL,
  `postID` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`classificationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `User` (
  `userID` VARCHAR(191) NOT NULL,
  `userName` VARCHAR(191) NOT NULL,
  `firstName` VARCHAR(191) NOT NULL,
  `lastName` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phNumber` VARCHAR(191) NULL,
  `gender` ENUM('male', 'female', 'others') NOT NULL,
  `dob` DATETIME(3) NULL,
  `avatarID` VARCHAR(191) NOT NULL,
  `reputation` DECIMAL(65, 30) NULL,
  `password` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  UNIQUE INDEX `User_userName_key`(`userName`),
  PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Friendship` (
  `friendshipID` VARCHAR(191) NOT NULL,
  `fromID` VARCHAR(191) NOT NULL,
  `toID` VARCHAR(191) NOT NULL,
  `status` ENUM(
    'STRANGERS',
    'REQUESTED',
    'FRIENDS',
    'BLOCKED_TO',
    'BLOCKED_BY'
  ) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`friendshipID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- CreateTable
CREATE TABLE `Avatar` (
  `avatarID` VARCHAR(191) NOT NULL,
  `sex` ENUM('man', 'woman') NOT NULL,
  `faceColor` VARCHAR(191) NOT NULL,
  `earSize` ENUM('small', 'big') NOT NULL,
  `hairColor` VARCHAR(191) NOT NULL,
  `hairStyle` ENUM(
    'normal',
    'thick',
    'mohawk',
    'womanLong',
    'womanShort'
  ) NOT NULL,
  `hatColor` VARCHAR(191) NOT NULL,
  `hatStyle` ENUM('none', 'beanie', 'turban') NOT NULL,
  `glassesStyle` ENUM('none', 'round', 'square') NOT NULL,
  `noseStyle` ENUM('short', 'long', 'round') NOT NULL,
  `mouthStyle` ENUM('laugh', 'smile', 'peace') NOT NULL,
  `shirtStyle` ENUM('hoody', 'short', 'polo') NOT NULL,
  `shirtColor` VARCHAR(191) NOT NULL,
  `bgColor` VARCHAR(191) NOT NULL,
  `isGradient` BOOLEAN NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`avatarID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- AddForeignKey
ALTER TABLE `Post`
ADD CONSTRAINT `Post_topicID_fkey` FOREIGN KEY (`topicID`) REFERENCES `Topic`(`topicID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Post`
ADD CONSTRAINT `Post_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Comments`
ADD CONSTRAINT `Comments_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`postID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Comments`
ADD CONSTRAINT `Comments_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Classification`
ADD CONSTRAINT `Classification_postID_fkey` FOREIGN KEY (`postID`) REFERENCES `Post`(`postID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `User`
ADD CONSTRAINT `User_avatarID_fkey` FOREIGN KEY (`avatarID`) REFERENCES `Avatar`(`avatarID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Friendship`
ADD CONSTRAINT `Friendship_fromID_fkey` FOREIGN KEY (`fromID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE `Friendship`
ADD CONSTRAINT `Friendship_toID_fkey` FOREIGN KEY (`toID`) REFERENCES `User`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
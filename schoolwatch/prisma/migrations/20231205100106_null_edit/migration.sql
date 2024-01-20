-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "correct" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "given" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "grade" DROP NOT NULL,
ALTER COLUMN "given" SET DEFAULT false,
ALTER COLUMN "homework" SET DEFAULT false,
ALTER COLUMN "zoom_link" DROP NOT NULL,
ALTER COLUMN "lesson_text" DROP NOT NULL,
ALTER COLUMN "homework_text" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "text" DROP NOT NULL;

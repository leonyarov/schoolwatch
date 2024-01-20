/*
  Warnings:

  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_course_id_fkey";

-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_user_id_fkey";

-- DropTable
DROP TABLE "Calendar";

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" INTEGER NOT NULL,
    "course_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start" TEXT NOT NULL DEFAULT '',
    "end" TEXT NOT NULL DEFAULT '',
    "resourceId" TEXT NOT NULL DEFAULT 'r1',
    "rrule" TEXT,
    "title" TEXT NOT NULL DEFAULT 'Available',
    "resizable" BOOLEAN NOT NULL DEFAULT false,
    "movable" BOOLEAN NOT NULL DEFAULT false,
    "bgColor" TEXT NOT NULL DEFAULT '#244aff',

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseRates" (
    "id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "student_rate" DOUBLE PRECISION NOT NULL,
    "teacher_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CourseRates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseRates_course_id_key" ON "CourseRates"("course_id");

-- AddForeignKey
ALTER TABLE "CalendarEvent" ADD CONSTRAINT "CalendarEvent_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRates" ADD CONSTRAINT "CourseRates_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

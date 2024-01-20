/*
  Warnings:

  - A unique constraint covering the columns `[student_id,course_id]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'RUB', 'ILS', 'UAH');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'ILS';

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_student_id_course_id_key" ON "Enrollment"("student_id", "course_id");

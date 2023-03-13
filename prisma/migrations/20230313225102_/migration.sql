/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" SET DEFAULT '',
ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'todo';

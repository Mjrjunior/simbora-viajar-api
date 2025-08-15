-- AlterTable
ALTER TABLE "public"."trips" ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

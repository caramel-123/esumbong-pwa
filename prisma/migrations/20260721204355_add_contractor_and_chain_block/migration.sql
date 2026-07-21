-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "contractor" TEXT;

-- CreateTable
CREATE TABLE "ChainBlock" (
    "id" SERIAL NOT NULL,
    "submissionId" TEXT,
    "previousHash" TEXT,
    "payloadHash" TEXT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChainBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChainBlock_submissionId_key" ON "ChainBlock"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "ChainBlock_blockHash_key" ON "ChainBlock"("blockHash");

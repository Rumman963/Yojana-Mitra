-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHi" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DocumentToScheme" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DocumentToScheme_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_key_key" ON "Document"("key");

-- CreateIndex
CREATE INDEX "_DocumentToScheme_B_index" ON "_DocumentToScheme"("B");

-- AddForeignKey
ALTER TABLE "_DocumentToScheme" ADD CONSTRAINT "_DocumentToScheme_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToScheme" ADD CONSTRAINT "_DocumentToScheme_B_fkey" FOREIGN KEY ("B") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

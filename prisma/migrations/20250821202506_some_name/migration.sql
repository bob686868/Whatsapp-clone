-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

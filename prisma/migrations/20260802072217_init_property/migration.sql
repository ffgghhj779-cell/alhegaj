-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "area" REAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "area" REAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'الرياض',
    "address" TEXT NOT NULL DEFAULT '',
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Property" ("area", "bathrooms", "createdAt", "description", "id", "imageUrl", "lat", "lng", "price", "rooms", "status", "title", "updatedAt") SELECT "area", "bathrooms", "createdAt", "description", "id", "imageUrl", "lat", "lng", "price", "rooms", "status", "title", "updatedAt" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/**
 * Seed script: Create the first admin user in Firebase.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Requires .env.local with FIREBASE_ADMIN_* variables set.
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "dotenv";

config({ path: ".env.local" });

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const adminAuth = getAuth(app);
const adminDb = getFirestore(app);

async function seedAdmin() {
  const email = "admin@robot.edu.vn";
  const password = "openstem2026";
  const displayName = "Admin";

  try {
    let user;
    try {
      user = await adminAuth.getUserByEmail(email);
      console.log(`User ${email} already exists: ${user.uid}`);
    } catch {
      user = await adminAuth.createUser({
        email,
        password,
        displayName,
      });
      console.log(`Created user: ${user.uid}`);
    }

    await adminDb
      .collection("users")
      .doc(user.uid)
      .set(
        {
          email,
          displayName,
          role: "admin",
          linkedStudentIds: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { merge: true }
      );

    console.log(`User doc created/updated for ${email} with role=admin`);
    console.log(`\nLogin: ${email} / ${password}`);
  } catch (err) {
    console.error("Error:", err);
  }

  process.exit(0);
}

seedAdmin();

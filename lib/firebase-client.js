// ============================================================
// MonksTrip — Firebase Client Library
// Replaces supabase-client.js
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// ── Firebase Config ──────────────────────────────────────────
const firebaseConfig = {
    apiKey: "AIzaSyCfGpFzzPtlEIQED0xLJXQWXH2-Q2O8QiM",
    authDomain: "monkstrip-travel.firebaseapp.com",
    projectId: "monkstrip-travel",
    storageBucket: "monkstrip-travel.firebasestorage.app",
    messagingSenderId: "382098957936",
    appId: "1:382098957936:web:a414145354b8051ac636b5",
    measurementId: "G-Y79KNEF5F7"
};

// ── Initialize ───────────────────────────────────────────────
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc,
    addDoc,
    collection,
    serverTimestamp
};

// ── Helper: Get Current User ─────────────────────────────────
export function getCurrentUser() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

// ── Helper: Sign Out ─────────────────────────────────────────
export async function signOut() {
    try {
        await firebaseSignOut(auth);
        window.location.href = '/index.html';
    } catch (err) {
        console.error('Sign out error:', err);
        throw err;
    }
}
window.signOut = signOut;

// ── Helper: Create/Merge User Profile in Firestore ───────────
export async function createUserProfile(user, extraData = {}) {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || extraData.displayName || '',
            photoURL: user.photoURL || '',
            createdAt: serverTimestamp(),
            ...extraData
        });
    }
}

// ── Helper: Update Auth UI (navbar) ──────────────────────────
export function updateAuthUI(user) {
    const loginLink = document.getElementById('login-link');
    const signupBtn = document.getElementById('signup-btn');
    const dashboardLink = document.getElementById('dashboard-link');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';
        if (dashboardLink) {
            dashboardLink.style.display = 'flex';
        } else {
            const navRight = document.querySelector('nav .flex.shrink-0.items-center.gap-4');
            if (navRight) {
                const newLink = document.createElement('a');
                newLink.id = 'dashboard-link';
                newLink.className = 'hidden md:flex bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 px-6 py-2.5 rounded-full font-bold text-sm items-center gap-2 transition-all duration-300';
                newLink.href = '/pages/dashboard.html';
                newLink.innerHTML = 'Dashboard <span class="material-symbols-outlined text-sm">dashboard</span>';
                navRight.prepend(newLink);
            }
        }
    } else {
        if (loginLink) loginLink.style.display = 'flex';
        if (signupBtn) signupBtn.style.display = 'flex';
        if (dashboardLink) dashboardLink.style.display = 'none';
    }
}

// ── Auto-run: Update nav UI on auth state change ─────────────
document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        updateAuthUI(user);
    });
});

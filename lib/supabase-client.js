import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://aaipcpuravrhbuwecyri.supabase.co';
const supabaseKey = 'sb_publishable_YtjljkObuQJT5Z30QbOPpA_EO6qCE_d';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

// Helper to get current user session
export async function getCurrentUser() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error getting session:", error);
        return null;
    }
    return session?.user || null;
}

// Helper to sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
        throw error;
    }
    window.location.href = '/index.html';
}

// Expose sign out to global scope for easy access in HTML if needed
window.signOut = signOut;

// Helper to update UI based on auth state
export async function updateAuthUI() {
    const user = await getCurrentUser();
    const loginLink = document.getElementById('login-link');
    const signupBtn = document.getElementById('signup-btn');
    const dashboardLink = document.getElementById('dashboard-link');

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (signupBtn) signupBtn.style.display = 'none';

        if (dashboardLink) {
            dashboardLink.style.display = 'flex';
        } else {
            // Find navbar and inject Dashboard link if not exists
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

// Run auth UI update on load
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    // Listen for auth state changes globally
    supabase.auth.onAuthStateChange((event, session) => {
        updateAuthUI();
    });
});

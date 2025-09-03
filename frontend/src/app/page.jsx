// =============================================================================
// The Opportunity Engine - Frontend (Next.js)
// =============================================================================
// This is the main page component for your Next.js application.
// When the frontend container starts, this is the view you will see
// at http://localhost:3003.
//
// File path: /frontend/src/app/page.tsx
// =============================================================================

import AuthForms from '@/components/auth/AuthForms';

export default function HomePage() {
    return <AuthForms />;
}

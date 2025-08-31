// =============================================================================
// The Opportunity Engine - Frontend (Next.js)
// =============================================================================
// This is the main page component for your Next.js application.
// When the frontend container starts, this is the view you will see
// at http://localhost:3003.
//
// File path: /frontend/src/app/page.tsx
// =============================================================================

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">
                    The Opportunity Engine
                </h1>
                <p className="text-2xl text-gray-300">
                    Frontend Service (Next.js) is running correctly.
                </p>
                <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-800/50 max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
                    <p className="text-gray-400">
                        You can now start building your UI components and pages in the `/frontend` directory. Changes will be reflected automatically thanks to hot-reloading.
                    </p>
                </div>
            </div>
        </main>
    );
}

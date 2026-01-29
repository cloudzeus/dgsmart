import Link from 'next/link'

export default function TestPage() {
    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-4xl font-bold text-slate-900">Test Page</h1>
            <p className="text-slate-600 mt-4">This is a test page without Navigation or Footer.</p>
            <Link href="/" className="text-secondary mt-4 inline-block">Back to Home</Link>
        </div>
    )
}

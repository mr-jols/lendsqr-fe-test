"use client";
import { useRouter } from "next/navigation";

export default function NotfoundPage() {
  const router = useRouter();
  return (
    <main className="not-found">
      <div>
        <h1>Page not found</h1>
        <p>
          {
            "Sorry, we can't find the page you're looking for. Check the address again or go back to your dashboard."
          }
        </p>
        <button
          className="submit-button submit-button--green"
          onClick={() => router.back()}
        >
          Take me Back
        </button>
      </div>
    </main>
  );
}

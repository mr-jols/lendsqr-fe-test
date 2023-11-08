"use client";

import LinkBuilder from "@/components/link";

export default function NotfoundPage() {
  return (
    <main className="not-found">
      <div>
        <h1>Page not found</h1>
        <p>
          {
            "Sorry, we can't find the page you're looking for. Check the address again or go back to your dashboard."
          }
        </p>
        <LinkBuilder
          props={{
            child: <>Take me back</>,
            className: "submit-button submit-button--green",
            href: "/login",
          }}
        />
      </div>
    </main>
  );
}

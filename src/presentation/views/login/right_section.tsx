import LoginForm from "./form";

export default function RightSection() {
  return (
    <section className="login-section login-section--right">
      <div>
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <LoginForm />
      </div>
    </section>
  );
}

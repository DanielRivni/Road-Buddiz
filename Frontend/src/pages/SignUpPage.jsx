import "../styles/SignUpPage.css";
import SignUpCard from "../components/SignUpCard";

function SignUpPage() {
  return (
    <>
      <div id="signup-page-content">
      <div className="top-center">
      <img src="public/logo-withoutback.png" />
      </div>
      <div id="home-page-card">
        <SignUpCard />
        </div>
      </div>
    </>
  );
}

export default SignUpPage;

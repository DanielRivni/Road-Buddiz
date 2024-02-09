import "../styles/HomePage.css";
import SignInCard from "../components/SignInCard";

function HomePage() {
  return (
    <>
      <div id="home-page-content">
        <div className="top-center">
          <img src="public/logo-withoutback.png" />
        </div>
        <div id="home-page-card">
          <SignInCard />
        </div>
      </div>
    </>
  );
}

export default HomePage;

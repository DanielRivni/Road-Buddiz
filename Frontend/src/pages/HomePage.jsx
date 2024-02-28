import "../styles/HomePage.css";
import SignInCard from "../components/SignInCard";
import logoWithoutBack from '../assets/logo-withoutback.png'

function HomePage() {
  return (
    <>
      <div id="home-page-content">
        <div className="top-center">
          <img src={logoWithoutBack} />
        </div>
        <div id="home-page-card">
          <SignInCard />
        </div>
      </div>
    </>
  );
}

export default HomePage;

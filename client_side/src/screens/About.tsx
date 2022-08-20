import { Link } from "react-router-dom";
import Leader from "../assets/images/Leadership.jpg";
import team from "../assets/images/Team.jpg";
import Helmet from "../components/Helmet";
import "../assets/css/about.css";

export default function About(): JSX.Element {
  return (
    <>
      <Helmet
        title="About"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
      >
        <main className="about">
          <div className="container">
            <div className="container-about">
              <h1>About BRAKT</h1>
              <p>
                BRAKT is a community of software developers getting together to
                help one another out. The software industry relies on
                collaboration and networked learning. We provide a place for
                that to happen. Our application is{" "}
                <Link to="/" aria-label="home page open source">
                  open source
                </Link>
                ,meaning you can inspect every little detail of the code, or
                chip in yourself! We are working to make our platform available
                for anyone to stand up similar communities in any niche or
                passion. We believe in transparency and adding value to the
                ecosystem. We hope you poke around and like what you see!
              </p>

              <h2>Leadership</h2>
              <img src={Leader} alt="Leadership" loading="lazy" />

              <h2>Team</h2>
              <img src={team} alt="Team" loading="lazy" />

              <p>
                Our team is distributed around the world. We have no office, but
                we come together online each day to build community and improve
                the software careers of millions.
              </p>
              <span>Happy coding ❤️</span>
            </div>
          </div>
        </main>
      </Helmet>
    </>
  );
}

import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import "../assets/css/faq.css";

export default function Faq() {
  return (
    <Helmet
      title="FAQ"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi deserunt vero assumenda veritatis quae, fugit, repellendus nam sed dolor, dicta perferendis ut alias quibusdam recusandae numquam. Aliquid, repellendus quasi?"
    >
      <main className="faq-page">
        <div className="d-flex">
          <section className="container-faq">
            <div className="container">
              <h1>Frequently Asked Questions 🤔</h1>
              <p className="text-capitalize">
                Some of these are not actually asked frequently, but they're
                still good to know.
              </p>

              <h2>How do I post article on dev.to?</h2>
              <p className="text-capitalize">
                Click on "Create Post" in the top right corner of the site.
                Write your article, give it a title, tag it with appropriate
                tags, and fill out any other relevant fields. Then, once you're
                ready, change published: false to published: true in the front
                matter of the post and save. Your post will now be published.
              </p>

              <h2>I found a security vulnerability. How do I report it?</h2>
              <p className="text-capitalize">
                Please email{" "}
                <Link to="/" aria-label="email support">
                  test@test.com
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </Helmet>
  );
}

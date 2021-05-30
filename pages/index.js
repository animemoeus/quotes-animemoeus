import { Navbar } from "../components/molecules";
import { Layout } from "../components/templates/";

export default function Home() {
  return (
    <Layout title="Quotes | AnimeMoeUs">
      <Navbar />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
        distinctio explicabo, harum, vero eius saepe totam reprehenderit ad
        perspiciatis error itaque vitae adipisci eum consectetur voluptatem
        magnam temporibus nulla. Quaerat!
      </p>
    </Layout>
  );
}

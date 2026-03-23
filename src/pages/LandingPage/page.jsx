import Hero from "./Hero";
import Events from "./Events";
import Posts from "./Post";
import OrgStructure from "./Orgstructure";
import About from "./About";
import Layouts from "../../Layouts";

export default function Page() {
  return (
    <Layouts>
      <div>
        <Hero />
        <About />
        <Events />
        <Posts />
        <OrgStructure />
      </div>
    </Layouts>
  );
}

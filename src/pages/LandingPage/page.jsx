import Hero from "./Hero";
import Events from "./Events";
import Posts from "./Posts";
import OrgStructure from "./Orgstructure";
import About from "./About";
import GuestLayouts from "../../components/layout/GuestLayout";

export default function Page() {
  return (
    <GuestLayouts>
      <div>
        <Hero />
        <About />
        <Events />
        <Posts />
        <OrgStructure />
      </div>
    </GuestLayouts>
  );
}

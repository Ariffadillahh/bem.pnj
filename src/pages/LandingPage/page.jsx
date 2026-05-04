import Hero from "./Hero";
import Events from "./Events";
import Posts from "./Posts";
import OrgStructure from "./Orgstructure";
import About from "./About";
import GuestLayouts from "../../components/layout/GuestLayout";
import RuangAdvok from "./RuangAdvok";

export default function Page() {
  return (
    <GuestLayouts>
      <Hero />
      <About />
      <Posts />
      <RuangAdvok />
    </GuestLayouts>
  );
}

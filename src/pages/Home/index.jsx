import Invites from '../../components/Home/Invites';
import Projects from '../../components/Home/Projects';
import Advertising from '../../components/Home/Advertising';
import Map from '../../components/Home/Map';

const Home = () => {
  return (
    <section className="flex flex-col gap-24">
      <Projects />
      <Invites />
      <Advertising />
      <Map />
    </section>
  );
};

export default Home;

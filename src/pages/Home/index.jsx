import Projects from '../../components/Home/Projects';
import Advertising from '../../components/Home/Advertising';
import Map from '../../components/Home/Map';
import Topics from '../../components/Home/Topics';
import { useRef } from 'react';
import InvitesInfos from '../../components/Home/Invites/InvitesInfos';

const Home = () => {
  const refProject = useRef(null);
  const refInvites = useRef(null);
  const refAdvertising = useRef(null);
  const refMap = useRef(null);

  return (
    <section className="flex flex-col gap-24">
      <Topics
        refProject={refProject}
        refInvites={refInvites}
        refAdversiting={refAdvertising}
        refMap={refMap}
      />
      <Projects refProject={refProject} />
      <InvitesInfos refInvites={refInvites} />
      <Advertising refAdvertising={refAdvertising} />
      <Map refMap={refMap} />
    </section>
  );
};

export default Home;

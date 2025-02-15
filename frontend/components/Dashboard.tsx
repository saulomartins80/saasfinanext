import Notifications from './Notifications';
import Challenges from './Challenges';
import Rewards from './Rewards';
import ChallengeAI from './ChallengeAI';

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard Personalizado</h1>
      <Notifications />
      <Gamification />
      <Challenges />
      <Rewards />
      <ChallengeAI />
    </div>
  );
}

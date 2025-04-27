import TeamManagement from '../components/TeamManagement';
import BackButton from '../components/BackButton';

export default function TeamManagementPage() {
  return (
    <div>
      <div className="mb-4">
        <BackButton />
      </div>
      <TeamManagement />
    </div>
  );
}

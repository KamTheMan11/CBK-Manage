
import CoachMode from '../components/CoachMode';
import BackButton from '../components/BackButton';

export default function CoachModePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <BackButton />
      </div>
      <CoachMode />
    </div>
  );
}

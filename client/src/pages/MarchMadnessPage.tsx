import MarchMadnessBracket from '../components/MarchMadnessBracket';
import BackButton from '../components/BackButton';

export default function MarchMadnessPage() {
  return (
    <div className="mb-20"> {/* Add margin to avoid overlap with ticker */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <BackButton />
          <div className="flex items-center">
            <img src="/images/ncaa-logo.png" alt="NCAA Logo" className="h-10 mr-2" />
            <img src="/images/ncaa-basketball-logo.png" alt="NCAA Basketball Logo" className="h-12 mr-2" />
            <img src="/images/march-madness-logo.png" alt="March Madness Logo" className="h-12" />
          </div>
        </div>
        <div className="mt-4">
          <MarchMadnessBracket />
        </div>
      </div>
    </div>
  );
}
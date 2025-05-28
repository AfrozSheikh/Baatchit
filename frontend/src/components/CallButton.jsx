import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 bg-white shadow-sm">
      <button
        onClick={handleVideoCall}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
      >
        <VideoIcon className="size-5" />
        <span className="text-sm font-medium">Start Call</span>
      </button>
    </div>
  );
}

export default CallButton;

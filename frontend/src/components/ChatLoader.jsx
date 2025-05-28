import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white p-4">
      <LoaderIcon className="animate-spin w-10 h-10 text-blue-600" />
      <p className="mt-4 text-center text-base text-gray-700 font-semibold">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;

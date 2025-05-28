import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-base-200 dark:bg-base-300 hover:shadow-lg transition-all duration-300 border border-base-300 dark:border-base-100">
    <div className="card-body p-4 sm:p-5 space-y-3">
      {/* USER INFO */}
      <div className="flex items-center gap-3">
        <div className="avatar size-12 ring-2 ring-primary/20 rounded-full overflow-hidden">
          <img 
            src={friend.profilePic} 
            alt={friend.fullName} 
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/default-avatar.png';
              e.currentTarget.onerror = null;
            }}
          />
        </div>
        <div>
          <h3 className="font-semibold text-base-content truncate max-w-[120px]">
            {friend.fullName}
          </h3>
          {friend.status && (
            <p className="text-xs text-base-content/70 flex items-center gap-1">
              <span className={`inline-block w-2 h-2 rounded-full ${
                friend.status === 'online' ? 'bg-success' : 'bg-warning'
              }`}></span>
              {friend.status}
            </p>
          )}
        </div>
      </div>
  
      {/* LANGUAGE BADGES */}
      <div className="flex flex-wrap gap-2">
        <span className="badge badge-secondary text-xs py-1.5 px-3">
          {getLanguageFlag(friend.nativeLanguage)}
          <span className="ml-1.5">Native: {friend.nativeLanguage}</span>
        </span>
        <span className="badge badge-outline text-xs py-1.5 px-3 border-base-content/20">
          {getLanguageFlag(friend.learningLanguage)}
          <span className="ml-1.5">Learning: {friend.learningLanguage}</span>
        </span>
      </div>
  
      {/* ACTION BUTTON */}
      <Link 
        to={`/chat/${friend._id}`} 
        className="btn btn-outline btn-sm sm:btn-md w-full mt-2 hover:bg-primary/10 hover:text-primary-focus hover:border-primary/30"
      >
        
        Message
      </Link>
    </div>
  </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}

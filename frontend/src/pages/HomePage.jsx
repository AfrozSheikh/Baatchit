import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
   <div className="p-4 sm:p-6 lg:p-8 bg-base-100 text-base-content">
  <div className="container mx-auto space-y-12">
    {/* Friends Section */}
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Your Friends</h2>
        <Link 
          to="/notifications" 
          className="btn btn-outline btn-sm hover:bg-primary/10 hover:text-primary-focus"
        >
          <UsersIcon className="mr-2 size-4" />
          Friend Requests
        </Link>
      </div>

      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </section>

    {/* Recommended Users Section */}
    <section className="space-y-6">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-secondary">Meet New Learners</h2>
            <p className="opacity-70 text-base-content/80">
              Discover perfect language exchange partners based on your profile
            </p>
          </div>
        </div>
      </div>

      {loadingUsers ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-secondary" />
        </div>
      ) : recommendedUsers.length === 0 ? (
        <div className="card bg-base-200 dark:bg-base-300 p-6 text-center border border-base-300 dark:border-base-100">
          <h3 className="font-semibold text-lg mb-2">No recommendations available</h3>
          <p className="text-base-content/70">
            Check back later for new language partners!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUsers.map((user) => {
            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

            return (
              <div
                key={user._id}
                className="card bg-base-200 dark:bg-base-300 hover:shadow-lg transition-all duration-300 border border-base-300 dark:border-base-100"
              >
                <div className="card-body p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar size-16 rounded-full ring-2 ring-primary/20">
                      <img src={user.profilePic} alt={user.fullName} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg text-base-content">{user.fullName}</h3>
                      {user.location && (
                        <div className="flex items-center text-sm opacity-70 mt-1 text-base-content/80">
                          <MapPinIcon className="size-3 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages with flags */}
                  <div className="flex flex-wrap gap-1.5">
                    <span className="badge badge-secondary">
                      {getLanguageFlag(user.nativeLanguage)}
                      Native: {capitialize(user.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline border-base-content/20">
                      {getLanguageFlag(user.learningLanguage)}
                      Learning: {capitialize(user.learningLanguage)}
                    </span>
                  </div>

                  {user.bio && <p className="text-sm opacity-70 text-base-content/80">{user.bio}</p>}

                  {/* Action button */}
                  <button
                    className={`btn w-full mt-2 ${
                      hasRequestBeenSent 
                        ? "btn-disabled bg-base-300 dark:bg-base-200 text-base-content/50" 
                        : "btn-primary hover:bg-primary-focus"
                    }`}
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  </div>
</div>
  );
};

export default HomePage;

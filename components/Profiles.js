// components/Profile.js

import Link from "next/link";
export default function Profile(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  return (
    <div className="p-4">
      <Link href={`/profile/${profile.id}`}>
        <div className="overflow-hidden bg-black border border-gray-600 shadow-md  max-w hover:bg-slate-900 rounded-xl">
          <div className="md:flex">
            <div className="p-4 md:shrink-0">
              {profile.picture ? (
                <img
                  class="inline-block h-14 w-14 rounded-full border border-gray-600"
                  src={
                    profile.picture.original
                      ? profile.picture.original.url.split("//")[0] == "ipfs:"
                        ? "https://lens.infura-ipfs.io/ipfs/" +
                          profile.picture.original.url.split("//")[1]
                        : "https://lens.infura-ipfs.io/ipfs/" +
                          profile.picture.original.url.split("/")[4]
                      : profile.picture.uri
                  }
                />
              ) : (
                <div
                  style={{
                    backgrondColor: "gray",
                  }}
                  className="object-cover w-full h-48 md:h-full md:w-48"
                />
              )}
            </div>
            <div className="p-3">
              <div className="text-sm font-semibold tracking-wide text-green-500 uppercase">
                {profile.handle}
                {displayFullProfile &&
                  profile.name &&
                  " (" + profile.name + ")"}
              </div>
              <div className="block mt-1 text-sm font-medium leading-tight text-pink-500 hover:underline">
                {profile.bio}
              </div>
              <div className="mt-2 text-sm text-white">{profile.ownedBy}</div>
              <p className="mt-2 text-xs text-white">
                following: {profile.stats.totalFollowing} followers:{" "}
                {profile.stats.totalFollowers}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

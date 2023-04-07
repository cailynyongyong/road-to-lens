// components/Profile.js

import Link from "next/link";
export default function Profile(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  return (
    <div className="p-8">
      <Link href={`/profile/${profile.id}`}>
        <div className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              {profile.picture ? (
                <img
                  src={
                    profile.picture.original
                      ? profile.picture.original.url
                      : profile.picture.uri
                  }
                  className="object-cover w-full h-48 md:h-full md:w-48"
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
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                {profile.handle}
                {displayFullProfile &&
                  profile.name &&
                  " (" + profile.name + ")"}
              </div>
              <div className="block mt-1 text-sm font-medium leading-tight text-black hover:underline">
                {profile.bio}
              </div>
              <div className="mt-2 text-sm text-slate-900">
                {profile.ownedBy}
              </div>
              <p className="mt-2 text-xs text-slate-500">
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

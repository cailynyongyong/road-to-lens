// components/Profile.js

export default function Feed(props) {
  const profile = props.profile;
  const post = props.post;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            {profile.picture ? (
              <img
                class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={
                  profile.picture.original
                    ? profile.picture.original.url
                    : profile.picture.uri
                }
                alt=""
                //className="object-cover w-full h-48 md:h-full md:w-48"
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
              {displayFullProfile && profile.name && " (" + profile.name + ")"}
            </div>
            <div className="mt-2 text-sm text-slate-900">
              {post.metadata.content}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              following: {profile.stats.totalFollowing} followers:{" "}
              {profile.stats.totalFollowers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

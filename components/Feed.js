// components/Profile.js

export default function Feed(props) {
  const profile = props.profile;
  const post = props.post;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto overflow-hidden bg-black border border-gray-600 shadow-md rounded-xl md:max-w-2xl">
        <div className="md:flex">
          <div className="p-4 md:shrink-0">
            {profile.picture ? (
              <img
                class="inline-block h-12 w-12 rounded-full border border-gray-600"
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
          <div className="p-3">
            <div className="text-sm font-semibold tracking-wide text-green-500 uppercase">
              {profile.handle}
              {displayFullProfile && profile.name && " (" + profile.name + ")"}
            </div>
            <div className="mt-2 text-sm text-white">
              {post.metadata.content}
            </div>
            <p className="mt-2 text-xs text-white">
              following: {profile.stats.totalFollowing} followers:{" "}
              {profile.stats.totalFollowers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
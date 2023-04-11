// components/FollowList.js

import Link from "next/link";
export default function FollowList(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;
  console.log(profile);

  return (
    <div>
      {/* <div class=" p-4">
        <div class="mt-2 flex items-center gap-x-6">
          <label
            for="about"
            class="block ml-5 text-m font-medium leading-6 text-green-500"
          >
            Follow Others
          </label>
        </div>
      </div> */}

      <div className="p-2">
        <Link href={`/profile/${profile.id}`}>
          <div className="overflow-hidden bg-black border border-gray-600 shadow-md max-w hover:bg-slate-900 rounded-xl">
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
                  {profile.name}
                </div>
                <div className="text-sm font-semibold tracking-wide text-pink-500 lowercase">
                  {"@" + profile.handle.split(".lens")[0] + ""}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

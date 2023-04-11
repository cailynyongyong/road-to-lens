// components/Publication.js
import { useState } from "react";
export default function Publication(props) {
  const profile = props.profile;
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  async function post() {
    setContentList([...contentList, content]);
  }

  return (
    <div>
      <div class=" p-4">
        <label
          for="about"
          class="block ml-10 text-m font-medium leading-6 text-green-500"
        >
          Post
        </label>
        <div class="ml-10 mt-2 max-w-[65%] overflow-y-scroll bg-black border border-gray-600 shadow-md rounded-xl">
          <input
            class="placeholder:italic overflow-y-scroll placeholder:text-slate-400 block text-white bg-black w-full border border-black rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
            placeholder="What's happening?"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
          <div class="mt-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              onClick={post}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
      {contentList?.length <= 0
        ? console.log()
        : contentList
            .slice()
            .reverse()
            .map((post, v) => {
              return (
                <div className="p-4">
                  <div className="ml-10 max-w-[65%] overflow-y-scroll bg-black border border-gray-600 shadow-md rounded-xl">
                    <div className="md:flex">
                      <div className="p-4 md:shrink-0">
                        {profile.picture ? (
                          <img
                            class="inline-block h-12 w-12 rounded-full border border-gray-600"
                            src={
                              profile.picture.original
                                ? profile.picture.original.url.split("//")[0] ==
                                  "ipfs:"
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
                        <div className="mt-2 text-sm text-white">{post}</div>
                        <p className="mt-2 text-xs text-white">
                          following: {profile.stats.totalFollowing} followers:{" "}
                          {profile.stats.totalFollowers}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  );
}

// components/Publication.js
import { useState } from "react";
export default function Publication(props) {
  const profile = props.profile;
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  async function post() {
    console.log("entering post function");
    setContentList([...contentList, content]);
  }

  return (
    <div>
      <div class="p-10">
        <label
          for="about"
          class="block text-m font-medium leading-6 text-green-500"
        >
          Post
        </label>
        <div class="mt-2">
          <textarea
            rows="3"
            class="block w-full rounded-md border border-gray-600 bg-black text-white shadow-sm  placeholder:text-gray-400  focus:ring-green-600 sm:py-1.5 sm:text-sm sm:leading-6"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div class="mt-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
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

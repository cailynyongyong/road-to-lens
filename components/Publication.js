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
          class="block text-m font-medium leading-6 text-gray-900"
        >
          Post
        </label>
        <div class="mt-2">
          <textarea
            rows="3"
            class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div class="mt-2 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                        <div className="mt-2 text-sm text-slate-900">
                          {post}
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
            })}
    </div>
  );
}

// components/Publication.js
import { useState } from "react";
import { uploadIpfs } from "./ipfs";
import { PublicationMainFocus } from "../interfaces/publication";
import { v4 as uuidv4 } from "uuid";
import LensClient, { polygon } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: polygon,
});

export default function Publication(props) {
  const profile = props.profile;
  const [postcontent, setContent] = useState("");
  const [contentList, setContentList] = useState([]);
  const [contentURI, setContentURI] = useState([]);

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  const metadata = {
    appId: "lenster",
    attributes: [],
    content: postcontent,
    description: "Description of the post created with LensClient SDK",
    locale: "en-US",
    mainContentFocus: PublicationMainFocus.TEXT_ONLY,
    metadata_id: uuidv4(),
    name: "Post created with LensClient SDK",
    tags: ["lens-sdk"],
    version: "2.0.0",
  };

  async function Metadata() {
    const validateResult = await lensClient.publication.validateMetadata(
      metadata
    );
    console.log(validateResult);
    if (!validateResult.valid) {
      throw new Error(`Metadata is not valid.`);
    }
  }

  // upload metadata to ipfs or arweave - upload is your custom function that returns contentURI
  async function Upload() {
    const contentURI = await uploadIpfs(metadata);
    console.log(contentURI);
    setContentURI(contentURI);
  }

  async function Dispatcher() {
    console.log("entering dispatcher function");
    // or with typedData that require signature and broadcasting
    const viaDispatcherResult =
      await lensClient.publication.createPostViaDispatcher({
        profileId: "0x01c634",
        contentURI,
        collectModule: {
          revertCollectModule: true, // collect disabled
        },
        referenceModule: {
          followerOnlyReferenceModule: false, // anybody can comment or mirror
        },
      });
    console.log("exited function");
    console.log("result:", viaDispatcherResult);
  }

  async function post() {
    await Metadata();
    await Upload();
    await Dispatcher();
    setContentList([...contentList, postcontent]);
  }

  return (
    <div>
      <div class="p-4">
        <label
          for="about"
          class="block text-m font-medium leading-6 text-green-500"
        >
          Post
        </label>
        <div class="mt-2 max-w overflow-hidden bg-black border border-gray-600 shadow-md rounded-xl">
          <input
            class="placeholder:italic overflow-hidden placeholder:text-slate-400 block text-white bg-black w-full border border-black rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
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
                  <div className="overflow-y-scroll bg-black border border-gray-600 shadow-md max-w hover:bg-slate-900 rounded-xl">
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
                          {profile.name}
                        </div>
                        <div className="text-sm font-semibold tracking-wide text-pink-500 lowercase">
                          {"@" + profile.handle.split(".lens")[0] + ""}
                        </div>
                        <div className="mt-2 text-sm text-white">{post}</div>
                        <p className="mt-2 text-xs text-white">
                          following: {profile.stats.totalFollowing} followers:{" "}
                          {profile.stats.totalFollowers}
                        </p>
                      </div>
                      {/* <div class="mt-2 flex mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="pink"
                          class="mr-3 w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                        <p className="mr-5 text-xs text-white">
                          {post.stats.totalAmountOfComments}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="blue"
                          class="mr-3 w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                          />
                        </svg>
                        <p className="mr-5 text-xs text-white">
                          {post.stats.totalAmountOfMirrors}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="green"
                          class="mr-3 w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        <p className="mr-5 text-xs text-white">
                          {post.stats.totalUpvotes}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="red"
                          class="mr-3 w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                          />
                        </svg>
                        <p className="mr-5 text-xs text-white">
                          {post.stats.totalAmountOfCollects}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
    </div>
  );
}

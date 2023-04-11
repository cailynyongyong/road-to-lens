// components/FollowList.js

import Link from "next/link";
export default function Profile(props) {
  const profile = props.profile;

  // When displayFullProfile is true, we show more info.
  const displayFullProfile = props.displayFullProfile;

  return (
    <div>
      <div class=" p-4">
        <div class="mt-2 flex items-center justify-end gap-x-6">
          <label
            for="about"
            class="block ml-10 text-m font-medium leading-6 text-green-500"
          >
            Follow Others
          </label>
          <div class="ml-10 mt-2 max-w-[65%] overflow-y-scroll bg-black border border-gray-600 shadow-md rounded-xl">
            <input
              class="placeholder:italic overflow-y-scroll placeholder:text-slate-400 block text-white bg-black w-full border border-black rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none sm:text-sm"
              placeholder="What's happening?"
              type="text"
            />
            <div class="mt-2 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                class="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

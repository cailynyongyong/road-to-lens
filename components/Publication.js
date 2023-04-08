// components/Publication.js

import Link from "next/link";
export default function Publication() {
  return (
    <div>
      <div class="col-span-full">
        <label
          for="about"
          class="block text-m font-medium leading-6 text-gray-900"
        >
          Post
        </label>
        <div class="mt-2">
          <textarea
            id="about"
            name="about"
            rows="3"
            class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          //onClick={}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

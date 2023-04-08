// components/Publication.js
import { Fragment, useState } from "react";
export default function Publication() {
  const [content, setContent] = useState("");
  const [contentList, setContentList] = useState([]);

  async function post() {
    console.log("entering post function");
    setContentList([...contentList, content]);
  }

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
            rows="3"
            class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={post}
        >
          Upload
        </button>
      </div>
      {contentList?.length > 0
        ? contentList.map((e, v) => {
            return (
              <div className="p-8">
                <div className="max-w-md mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
                  <div className="md:flex">
                    <div className="p-8">
                      <p className="mt-2 text-xs whitespace-pre-line text-slate-500">
                        {e}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : "false"}
    </div>
  );
}

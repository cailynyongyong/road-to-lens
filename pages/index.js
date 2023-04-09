import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Publication from "../components/Publication.js";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import Post from "../components/Post.js";
import fetchProfileQuery from "../queries/fetchProfileQuery.js";

export default function Home() {
  //const { loading, error, data } = useQuery(recommendedProfiles);
  const id = "0x01c634";
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: id },
      publicationsRequest: {
        profileId: id,
        publicationTypes: ["POST"], // We really only want POSTs
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;
  // if (loading) return "Loading..";
  // if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Header />
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Feed</h1>
        </div>
      </header>
      <main>
        <Publication profile={data.profile} displayFullProfile={true} />
        {data.publications.items.map((post, index) => {
          return (
            <Feed
              key={index}
              profile={data.profile}
              displayFullProfile={true}
              post={post}
            />
          );
        })}
      </main>
    </div>
  );
}

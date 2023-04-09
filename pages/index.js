import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Publication from "../components/Publication.js";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import fetchProfileQuery from "../queries/fetchProfileQuery.js";

function list() {
  const { loading, error, data } = useQuery(recommendedProfiles);
  const idList = [];
  console.log(data);

  data.recommendedProfiles.map((profile, index) => {
    console.log("profileid:", profile.id);
    idList.push(profile.id);
  });

  console.log("Id lists: ", idList);

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return idList;
}

export default function Home() {
  //list();
  const idList = list();
  console.log("Id list called from default function: ", idList);
  const id = "0x01c634";
  const { loading, error, data } = useQuery(fetchProfileQuery, {
    variables: {
      request: { profileId: idList[1] },
      publicationsRequest: {
        profileId: idList[1],
        publicationTypes: ["POST"], // We really only want POSTs
      },
    },
  });

  if (loading) return "Loading..";
  if (error) return `Error! ${error.message}`;

  return (
    <div class="bg-black">
      <Header />
      <header class="bg-black shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-green-500">Feed</h1>
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

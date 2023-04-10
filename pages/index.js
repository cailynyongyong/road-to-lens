import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Publication from "../components/Publication.js";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import fetchProfileQuery from "../queries/fetchProfileQuery.js";
import LensClient, { mumbai, polygon } from "@lens-protocol/client";
import { useState, useEffect } from "react";

const lensClient = new LensClient({
  environment: polygon,
});

export default function Home() {
  const [content, setContent] = useState([]);
  const [myprofile, setMyProfile] = useState([]);

  const { loading, error, data } = useQuery(recommendedProfiles);

  useEffect(() => {
    async function getPublications() {
      const idList = [];

      data?.recommendedProfiles.map((profile) => {
        idList.push(profile.id);
      });

      console.log("Id lists: ", idList);

      const result = await lensClient.publication.fetchAll({
        profileIds: idList,
        publicationTypes: ["POST"],
        limit: 10,
      });
      setContent(result.items);
      console.log("recommended result:", result.items);

      const myresult = await lensClient.publication.fetchAll({
        profileId: "0x01c634",
        publicationTypes: ["POST"],
        limit: 10,
      });
      const profile = myresult.items[0].profile;
      setMyProfile(profile);
      console.log("my result: ", myresult);
    }
    getPublications();
  }, [data]);

  return (
    <div class="bg-black">
      <Header />
      <header class="bg-black shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-green-500">Feed</h1>
        </div>
      </header>
      <main>
        <Publication profile={myprofile} displayFullProfile={true} />
        {content.map((e) => {
          return (
            <div>
              <Feed profile={e.profile} displayFullProfile={true} post={e} />
            </div>
          );
        })}
        {/* {data.publications.items.map((post, index) => {
          return (
            <Feed
              key={index}
              profile={data.profile}
              displayFullProfile={true}
              post={post}
            />
          );
        })} */}
      </main>
    </div>
  );
}

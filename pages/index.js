import { useQuery } from "@apollo/client";
import recommendedProfiles from "../queries/recommendedProfilesQuery.js";
import Publication from "../components/Publication.js";
import Header from "../components/Header.js";
import Feed from "../components/Feed.js";
import LensClient, { mumbai, polygon } from "@lens-protocol/client";
import { useState, useEffect } from "react";
import FollowList from "../components/FollowList.js";

const lensClient = new LensClient({
  environment: polygon,
});

export default function Home() {
  const [content, setContent] = useState([]);
  const [myprofile, setMyProfile] = useState([]);
  const [profileList, setprofileList] = useState([]);

  const { loading, error, data } = useQuery(recommendedProfiles);

  useEffect(() => {
    async function getPublications() {
      const idList = [];
      const profileList = [];
      if (data == undefined || data == null) return;

      data.recommendedProfiles.map((profile) => {
        idList.push(profile.id);
      });

      for (let i = 0; i < 6; i++) {
        profileList.push(data.recommendedProfiles[i]);
      }
      setprofileList(profileList);

      const result = await lensClient.publication.fetchAll({
        profileIds: idList,
        publicationTypes: ["POST"],
      });
      setContent(result.items);

      const myresult = await lensClient.publication.fetchAll({
        profileId: "0x01c634",
        publicationTypes: ["POST"],
      });
      const profile = myresult.items[0].profile;
      setMyProfile(profile);
    }
    getPublications();
  }, [data]);
  // if (loading) return "Loading..";
  // if (error) return `Error! ${error.message}`;

  return (
    <div class="min-h-screen bg-black">
      <Header />
      <div class="flex flex-row">
        <div class="basis-[70%] mt-7 ml-5 container border border-gray-600 rounded-xl">
          <Publication profile={myprofile} displayFullProfile={true} />
          {content.map((e, index) => {
            return (
              <div>
                <Feed
                  key={index}
                  profile={e.profile}
                  displayFullProfile={true}
                  post={e}
                />
              </div>
            );
          })}
        </div>
        <div class="basis-1/4">
          <div class=" p-4">
            <div class="mt-2 flex items-center gap-x-6">
              <label
                for="about"
                class="block ml-8 text-m font-medium leading-6 text-green-500"
              >
                Follow Others
              </label>
            </div>
          </div>
          <div class="basis-1/2  ml-10 container border border-gray-600 rounded-xl">
            {profileList.map((profile, index) => {
              return <FollowList profile={profile} displayFullProfile={true} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

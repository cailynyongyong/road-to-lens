// pages/posts/[postId].js

import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Profile from "../../components/Profiles.js";
import Feed from "../../components/Feed.js";
import Header from "../../components/Header.js";
import LensClient, { mumbai, polygon } from "@lens-protocol/client";
import { useState, useEffect } from "react";
import { comment } from "postcss";

const lensClient = new LensClient({
  environment: polygon,
});

export default function PostPage() {
  const [content, setContent] = useState("");
  const [profiles, setProfile] = useState([]);
  const [comment, setComment] = useState([]);
  const router = useRouter();
  const { postId } = router.query;

  console.log("fetching post for", postId);
  //   const { loading, error, data } = useQuery(fetchProfileQuery, {
  //     variables: {
  //       request: { publicationId: postId },
  //       publicationsRequest: {
  //         publicationId: postId,
  //         publicationTypes: ["POST"], // We really only want POSTs
  //       },
  //     },
  //   });
  useEffect(() => {
    async function getPublications() {
      if (postId == null || postId == undefined) return;
      const result = await lensClient.publication.fetch({
        publicationId: postId,
      });
      setContent(result);
      setProfile(result.profile);
      console.log("result:", result);

      //   const comments = await lensClient.publication.fetchAll({
      //     profileId: result.profile.id,
      //     publicationTypes: ["COMMENT"],
      //   });
      //   console.log("comments: ", comments.items);
      //   setComment(comments.items);
    }

    getPublications();
  }, [postId]);

  //   if (loading) return "Loading..";
  //   if (error) return `Error! ${error.message}`;

  return (
    <div class=" bg-black">
      <Header />
      <div className="flex flex-col items-center p-8">
        {/* <Profile profile={post.profile} displayFullProfile={true} /> */}
        {profiles.length != 0 && content.length != 0 && (
          <Feed profile={profiles} post={content} />
        )}
        {/* {comment.map((item) => {
          return (
            <div>
              <Feed
                profile={item.profile}
                displayFullProfile={true}
                post={item}
              />
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

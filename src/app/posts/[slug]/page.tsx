import dynamic from "next/dynamic";

const PostPage = dynamic(() => import("@/pages/PostPage"), {
	ssr: false,
});

const Post = () => {
	return <PostPage />;
};

export default Post;

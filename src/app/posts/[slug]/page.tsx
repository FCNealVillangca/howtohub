import PostPage from "@/pages/PostPage";
import React from "react";

const Post = ({ params }: { params: { slug: string } }) => {
	return (
		<PostPage
			title="Understanding TypeScript in React"
			author="Jane Doe"
			date="August 29, 2024"
			content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem consequatur pariatur quidem, neque vero vitae delectus voluptatem? Inventore impedit veniam, quaerat eligendi numquam molestias dignissimos nobis officia quasi quae illo."
		/>
	);
};

export default Post;

import React from "react";

// Define a type for the blog post, if needed
interface PostPageProps {
	title: string;
	author: string;
	date: string;
	content: string;
}

const PostPage: React.FC<PostPageProps> = ({
	title,
	author,
	date,
	content,
}) => {
	return (
		<div className="bg-white rounded-lg shadow-lg p-6 mb-6 mx-auto">
			{/* Blog Title */}
			<h1 className="text-3xl font-bold mb-4">{title}</h1>

			{/* Author and Date */}
			<div className="text-sm text-gray-600 mb-4">
				<p>By {author}</p>
				<p>{date}</p>
			</div>

			{/* Blog Content */}
			<div className="text-lg text-gray-800">{content}</div>
		</div>
	);
};

export default PostPage;

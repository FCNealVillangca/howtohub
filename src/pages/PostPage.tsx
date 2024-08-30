"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const PostPage: React.FC = () => {
	const params = useParams<{ slug: string }>();
	const slug = params && params.slug;
	const [post, setPost] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const handleFetch = async () => {
		if (slug) {
			try {
				const res = await fetch(`/api/posts/${slug}`);
				if (res.ok) {
					const data = await res.json();
					if (data) {
						setPost(data);
					} else {
						console.warn("No post found for this slug");
					}
				} else {
					console.error("Failed to fetch post", res.statusText);
				}
			} catch (error) {
				console.error("Error fetching post:", error);
			} finally {
				setLoading(false);
			}
		} else {
			console.warn("Slug is undefined");
			setLoading(false);
		}
	};

	useEffect(() => {
		if (slug) {
			handleFetch();
		} else {
			setLoading(false);
		}
	}, [slug]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!post) {
		return <div>Post not found</div>;
	}

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 mb-6 mx-auto">
			{/* Go Back Home Button */}
			<button
				onClick={() => router.push("/")}
				className="text-blue-500 hover:underline mb-4"
			>
				Go Back Home
			</button>

			{/* Blog Title */}
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>

			{/* Author and Date */}
			<div className="text-sm text-gray-600 mb-4">
				<p>By me</p>
				<p>posted {new Date(post.createdAt).toLocaleDateString()}</p>
			</div>

			{/* Blog Content */}
			<div className="text-lg text-gray-800">{post.content}</div>
		</div>
	);
};

export default PostPage;

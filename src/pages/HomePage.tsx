"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faPlus,
	faTrash,
	faEdit,
	faSpinner,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMainContext } from "@/context/main";

// Spinner component using Font Awesome
const Spinner = () => (
	<div className="flex justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} spin className="text-gray-500 text-3xl" />
		<span className="ml-4">Loading</span>
	</div>
);

const HomePage = () => {
	const [posts, setPosts] = useState<Array<{ [key: string]: string }>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const context = useMainContext();

	const fetchPosts = async () => {
		try {
			const res = await fetch("/api/posts");
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const posts = await res.json();
			context?.addPostList(posts);
		} catch (error) {
			setPosts([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log(context);
		fetchPosts();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());
		alert(JSON.stringify(data));

		try {
			// const res = await fetch("/api/posts", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// });

			setIsModalOpen(false);
		} catch (error) {
			console.error("Failed to submit form:", error);
		}
	};

	return (
		<div>
			{/* Search card */}
			<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
				<div className="flex items-center space-x-2">
					<Input
						type="text"
						placeholder="Search..."
						className="flex-grow border rounded-md p-2 focus:outline-none"
					/>
					<Button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white flex items-center"
					>
						<FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
					</Button>
					{/* Add button triggers the modal */}
					<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
						<DialogTrigger asChild>
							<Button
								type="button"
								className="px-4 py-2 bg-green-500 text-white flex items-center"
								onClick={() => setIsModalOpen(true)}
							>
								<FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
							</Button>
						</DialogTrigger>
						<DialogContent>
							<div className="p-6 relative">
								{/* Close button */}
								<Button
									type="button"
									className="absolute top-4 right-4 text-gray-500"
									onClick={() => setIsModalOpen(false)}
									variant="ghost"
								>
									<FontAwesomeIcon icon={faTimes} className="text-2xl" />
								</Button>
								<h2 className="text-lg font-semibold mb-4">Add New Post</h2>
								<form onSubmit={handleSubmit}>
									<Input
										name="tittle"
										type="text"
										placeholder="Title"
										className="mb-4 border rounded-md p-2 w-full focus:outline-none"
									/>
									<textarea
										name="content"
										placeholder="Content"
										className="mb-4 border rounded-md p-2 w-full focus:outline-none"
										rows={5}
									/>
									<div className="flex justify-end space-x-4">
										<Button
											type="button"
											className="px-4 py-2 bg-gray-500 text-white"
											onClick={() => setIsModalOpen(false)}
											variant="ghost"
										>
											Cancel
										</Button>
										<Button
											type="submit"
											className="px-4 py-2 bg-blue-500 text-white"
										>
											Submit
										</Button>
									</div>
								</form>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* List of data */}
			{loading ? (
				<Spinner />
			) : (
				<div>
					{context?.state?.posts && context?.state?.posts.length > 0 ? (
						context?.state?.posts.map((item) => (
							<div
								key={item._id}
								className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
							>
								<div>
									<Link
										href={`/posts/${item.slug}`}
										className="text-gray-600 hover:text-gray-400 text-lg font-semibold"
									>
										{item.title}
									</Link>
								</div>
								<div className="flex space-x-2">
									<Button
										type="button"
										className="px-2 py-1 bg-blue-500 text-white flex items-center"
										variant="ghost"
									>
										<FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
									</Button>
									<Button
										type="button"
										className="px-2 py-1 bg-red-500 text-white flex items-center"
										variant="ghost"
									>
										<FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
									</Button>
								</div>
							</div>
						))
					) : (
						<div className="text-center text-gray-600 mt-8">
							<FontAwesomeIcon icon={faTrash} className="text-4xl mb-4" />
							<p className="text-lg font-semibold">No Posts Yet</p>
							<p className="mt-2">
								It looks like there are no posts available. Be the first to
								create one!
							</p>
							<Button
								type="button"
								className="mt-4 px-4 py-2 bg-green-500 text-white"
								onClick={() => setIsModalOpen(true)}
							>
								Add Post
							</Button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default HomePage;

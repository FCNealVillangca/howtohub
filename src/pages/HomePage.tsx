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
	faTimes, // Import the spinner icon
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"; // Import Shadcn Dialog components

// Spinner component using Font Awesome
const Spinner = () => (
	<div className="flex justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} spin className="text-gray-500 text-3xl" />{" "}
		<span className="ml-4">Loading</span>
	</div>
);

const HomePage = () => {
	const [posts, setPosts] = useState<Array<{ [key: string]: string }>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const fetchPosts = async () => {
		try {
			const res = await fetch("/api/posts");
			const posts = await res.json();
			return posts;
		} catch (error) {
			return [];
		}
	};

	useEffect(() => {
		fetchPosts().then((posts) => {
			setPosts(posts);
			setLoading(false);
		});
	}, []);

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
					<button
						type="button"
						className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center"
					>
						<FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
					</button>
					{/* Add button triggers the modal */}
					<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
						<DialogTrigger asChild>
							<button
								type="button"
								className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center"
								onClick={() => setIsModalOpen(true)}
							>
								<FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
							</button>
						</DialogTrigger>
						<DialogContent>
							<div className="p-6 relative">
								{/* Close button */}
								<button
									type="button"
									className="absolute top-4 right-4 text-gray-500"
									onClick={() => setIsModalOpen(false)}
								>
									<FontAwesomeIcon icon={faTimes} className="text-2xl" />
								</button>
								<h2 className="text-lg font-semibold mb-4">Add New Post</h2>
								{/* Add your form or content here */}
								<form>
									<Input
										type="text"
										placeholder="Title"
										className="mb-4 border rounded-md p-2 w-full focus:outline-none"
									/>
									<Input
										type="text"
										placeholder="Content"
										className="mb-4 border rounded-md p-2 w-full focus:outline-none"
									/>
									<div className="flex justify-end space-x-4">
										<button
											type="button"
											className="px-4 py-2 bg-gray-500 text-white rounded-md"
											onClick={() => setIsModalOpen(false)}
										>
											Cancel
										</button>
										<button
											type="submit"
											className="px-4 py-2 bg-blue-500 text-white rounded-md"
										>
											Submit
										</button>
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
					{posts.length > 0 ? (
						posts.map((item) => (
							<div
								key={item.id}
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
									<button
										type="button"
										className="px-2 py-1 bg-blue-500 text-white rounded-md flex items-center"
									>
										<FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
									</button>
									<button
										type="button"
										className="px-2 py-1 bg-red-500 text-white rounded-md flex items-center"
									>
										<FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
									</button>
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
							<button
								type="button"
								className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
								onClick={() => setIsModalOpen(true)}
							>
								Add Post
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default HomePage;

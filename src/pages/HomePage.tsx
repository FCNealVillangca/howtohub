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
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMainContext } from "@/context/main";
import validator from "@/lib/validator";
import { PostSchema } from "@/validation/PostSchema";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ErrorsType = {
	title?: string;
	content?: string;
	categoryId?: string;
};

const initialErrors = {
	title: "",
	content: "",
	categoryId: "",
};

// Spinner component using Font Awesome
const Spinner = () => (
	<div className="flex justify-center items-center">
		<FontAwesomeIcon icon={faSpinner} spin className="text-gray-500 text-3xl" />
		<span className="ml-4">Loading</span>
	</div>
);

const HomePage = () => {
	const [posts, setPosts] = useState<Array<{ [key: string]: string }>>([]);
	const [errors, setErrors] = useState<ErrorsType>(initialErrors);
	const [loading, setLoading] = useState<boolean>(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [editPost, setEditPost] = useState<{ [key: string]: string } | null>(
		null
	);
	const context = useMainContext();
	const [searchQuery, setSearchQuery] = useState<string>("");

	const fetchPosts = async () => {
		try {
			const res = await fetch("/api/posts");
			if (!res.ok) {
				throw new Error("Network response was not ok");
			}
			const posts = await res.json();
			context?.addPostList(posts);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleDelete = async (slug: string) => {
		try {
			const response = await fetch(`/api/posts/${slug}`, {
				method: "DELETE",
			});

			if (response.ok) {
				console.log("Post deleted successfully");
				context?.removePost(slug);
				// Update state or handle UI changes
			} else {
				const error = await response.json();
				console.error("Failed to delete post:", error);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrors(initialErrors);
		const formData = new FormData(event.currentTarget);
		const form = Object.fromEntries(formData.entries());
		const validation = validator(PostSchema, form) as any;
		console.log(form);

		if (validation) {
			setErrors(validation);
		} else {
			try {
				const method = editPost ? "PUT" : "POST";
				const url = "/api/posts";
				const res = await fetch(url, {
					method,
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(form),
				});
				const data = await res.json();
				console.log(data);

				editPost ? context?.updatePost(data) : context?.addPost(data);
			} catch (error) {
				console.error("Failed to submit form:", error);
			}

			setLoading(false);
			setErrors(initialErrors);
			setIsModalOpen(false);
			setIsEditModalOpen(false);
			setEditPost(null);
		}
	};
	const filteredPosts = context?.state?.posts.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	return (
		<div>
			{/* Search card */}
			<div className="bg-white rounded-lg shadow-lg p-6 mb-6">
				<div className="flex items-center space-x-2">
					<Input
						type="text"
						placeholder="Search..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-grow border rounded-md p-2 focus:outline-none"
					/>

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
									onClick={() => {
										setErrors(initialErrors);
										setIsModalOpen(false);
									}}
									variant="ghost"
								>
									<FontAwesomeIcon icon={faTimes} className="text-2xl" />
								</Button>

								<DialogTitle className="text-lg font-semibold mb-4">
									Add New Post
								</DialogTitle>
								<DialogDescription className="mb-4">
									add new post
								</DialogDescription>
								<form onSubmit={handleSubmit}>
									<div className="mb-4">
										<Input
											name="title"
											type="text"
											placeholder="Title"
											className="border rounded-md p-2 w-full focus:outline-none"
										/>
										{errors.title && (
											<small className="mt-4 text-red-400">
												{errors.title}
											</small>
										)}
									</div>
									<div className="mb-4">
										<textarea
											name="content"
											placeholder="Content"
											className="border rounded-md p-2 w-full focus:outline-none"
											rows={5}
										/>
										{errors.content && (
											<small className="mt-4 text-red-400">
												{errors.content}
											</small>
										)}
									</div>
									<div className="mb-4">
										<Select name="categoryId">
											<SelectTrigger>
												<SelectValue placeholder="Select Category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{context?.state.categories &&
														context?.state.categories.map((item) => {
															return (
																<SelectItem key={item._id} value={item._id}>
																	{item.name}
																</SelectItem>
															);
														})}
												</SelectGroup>
											</SelectContent>
										</Select>{" "}
										{errors.categoryId && (
											<small className="mt-4 text-red-400">
												{errors.categoryId}
											</small>
										)}
									</div>
									<div className="flex justify-end space-x-4">
										<Button
											type="button"
											className="px-4 py-2 bg-gray-500 text-white"
											onClick={() => {
												setErrors(initialErrors);
												setIsModalOpen(false);
											}}
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
					{/* Edit button triggers the edit modal */}
					{editPost && (
						<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
							<DialogTrigger asChild>
								<Button
									type="button"
									className="px-4 py-2 bg-blue-500 text-white flex items-center"
									onClick={() => setIsEditModalOpen(true)}
								>
									<FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
								</Button>
							</DialogTrigger>
							<DialogContent>
								<div className="p-6 relative">
									{/* Close button */}
									<Button
										type="button"
										className="absolute top-4 right-4 text-gray-500"
										onClick={() => {
											setErrors(initialErrors);
											setIsEditModalOpen(false);
											setEditPost(null);
										}}
										variant="ghost"
									>
										<FontAwesomeIcon icon={faTimes} className="text-2xl" />
									</Button>

									<DialogTitle className="text-lg font-semibold mb-4">
										Edit Post
									</DialogTitle>
									<DialogDescription className="mb-4">
										edit your post.
									</DialogDescription>
									<form onSubmit={handleSubmit}>
										<input
											name="id"
											type="hidden"
											value={editPost ? editPost._id : ""}
										/>
										<div className="mb-4">
											<Input
												name="title"
												type="text"
												defaultValue={editPost.title}
												placeholder="Title"
												className="border rounded-md p-2 w-full focus:outline-none"
											/>
											{errors.title && (
												<small className="mt-4 text-red-400">
													{errors.title}
												</small>
											)}
										</div>
										<div className="mb-4">
											<textarea
												name="content"
												defaultValue={editPost.content}
												placeholder="Content"
												className="border rounded-md p-2 w-full focus:outline-none"
												rows={5}
											/>
											{errors.content && (
												<small className="mt-4 text-red-400">
													{errors.content}
												</small>
											)}
										</div>
										<div className="mb-4">
											<Select
												name="categoryId"
												defaultValue={editPost.categoryId}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select Category" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{context?.state.categories &&
															context?.state.categories.map((item) => {
																return (
																	<SelectItem key={item._id} value={item._id}>
																		{item.name}
																	</SelectItem>
																);
															})}
													</SelectGroup>
												</SelectContent>
											</Select>{" "}
											{errors.categoryId && (
												<small className="mt-4 text-red-400">
													{errors.categoryId}
												</small>
											)}
										</div>
										<div className="flex justify-end space-x-4">
											<Button
												type="button"
												className="px-4 py-2 bg-gray-500 text-white"
												onClick={() => {
													setErrors(initialErrors);
													setIsEditModalOpen(false);
													setEditPost(null);
												}}
												variant="ghost"
											>
												Cancel
											</Button>
											<Button
												type="submit"
												className="px-4 py-2 bg-blue-500 text-white"
											>
												Save Changes
											</Button>
										</div>
									</form>
								</div>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>

			{/* List of data */}
			{loading ? (
				<Spinner />
			) : (
				<>
					{filteredPosts && filteredPosts.length > 0 ? (
						filteredPosts.map((item) => (
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
										onClick={() => {
											setEditPost(item);
											setIsEditModalOpen(true);
										}}
									>
										<FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
									</Button>

									<Button
										type="button"
										className="px-2 py-1 bg-red-500 text-white flex items-center"
										variant="ghost"
										onClick={() => handleDelete(item.slug)}
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
				</>
			)}
		</div>
	);
};

export default HomePage;

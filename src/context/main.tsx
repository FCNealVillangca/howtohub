"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import makeUniqueById from "@/lib/makeArrayUnique";

const MainContext = createContext<
	| {
			state: MainStateType;
			addPost: (post: PostType) => void;
			updatePost: (post: PostType) => void;
			addPostList: (posts: PostType[]) => void;
			addCategoryList: (categories: CategoryType[]) => void;
			removePost: (postId: string) => void; // Added method
	  }
	| undefined
>(undefined);

type CategoryType = {
	_id: string;
	name: string;
};

type PostType = {
	_id: string;
	title: string;
	content: string;
	categoryId: string;
	slug: string;
};

type MainStateType = {
	categories: Array<CategoryType>;
	posts: Array<PostType>;
};

const MainContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, setState] = useState<MainStateType>({
		posts: [],
		categories: [],
	});

	const addPost = (post: PostType) => {
		setState((prevState) => ({
			...prevState,
			posts: makeUniqueById([...prevState.posts, post]),
		}));
	};

	const updatePost = (updatedPost: PostType) => {
		setState((prevState) => ({
			...prevState,
			posts: prevState.posts.map((post) =>
				post._id === updatedPost._id ? updatedPost : post
			),
		}));
	};

	const addPostList = (posts: PostType[]) => {
		setState((prevState) => ({
			...prevState,
			posts: makeUniqueById([...prevState.posts, ...posts]),
		}));
	};

	const addCategoryList = (categories: CategoryType[]) => {
		setState((prevState) => ({
			...prevState,
			categories: categories,
		}));
	};
	const removePost = (slug: string) => {
		setState((prevState) => ({
			...prevState,
			posts: prevState.posts.filter((post) => post.slug !== slug),
		}));
	};

	return (
		<MainContext.Provider
			value={{
				state,
				addPost,
				updatePost,
				addPostList,
				addCategoryList,
				removePost,
			}}
		>
			{children}
		</MainContext.Provider>
	);
};

export default MainContextProvider;
export { MainContext };
export const useMainContext = () => {
	return useContext(MainContext);
};
